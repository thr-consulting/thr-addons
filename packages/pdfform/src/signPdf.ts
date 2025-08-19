import {Buffer} from 'node:buffer';
import {Readable} from 'node:stream';
import {PDFDocument} from 'pdf-lib';

export interface SignatureSchemaType {
	type: 'image/png' | 'image/jpeg' | 'image/svg+xml';
	data: string; // base64 or data URL
	timestamp?: Date;
}

export interface PDFSignature {
	signature: SignatureSchemaType;
	location: {
		width?: number;
		height?: number;
		x: number;
		y: number;
		onPage: number;
	};
}

export type PdfInputType = Buffer | Uint8Array | ArrayBuffer | Readable;

function streamToBuffer(stream: Readable): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		const chunks: Buffer[] = [];
		stream.on('data', (chunk: Buffer) => {
			chunks.push(chunk);
		});
		stream.on('end', () => {
			resolve(Buffer.concat(chunks));
		});
		stream.on('error', streamError => {
			reject(streamError);
		});
	});
}

async function convertToBuffer(input: PdfInputType): Promise<Buffer> {
	if (Buffer.isBuffer(input)) {
		return input;
	}
	if (input instanceof Uint8Array) {
		return Buffer.from(input);
	}
	if (input instanceof ArrayBuffer) {
		return Buffer.from(input);
	}
	if (input instanceof Readable) {
		return streamToBuffer(input);
	}
	throw new Error('Unsupported input type');
}

function decodeImageData(data: string): Uint8Array {
	if (data.startsWith('data:image/')) {
		const base64Data = data.split(',')[1];
		if (!base64Data) {
			throw new Error('Invalid data URL format');
		}
		return new Uint8Array(Buffer.from(base64Data, 'base64'));
	}
	try {
		return new Uint8Array(Buffer.from(data, 'base64'));
	} catch {
		throw new Error('Failed to decode image data as base64');
	}
}

function calculateAspectRatioFit(
	originalWidth: number,
	originalHeight: number,
	maxWidth: number,
	maxHeight: number,
): {width: number; height: number} {
	const aspectRatio = originalWidth / originalHeight;

	let calculatedWidth = maxWidth;
	let calculatedHeight = calculatedWidth / aspectRatio;

	if (calculatedHeight > maxHeight) {
		calculatedHeight = maxHeight;
		calculatedWidth = calculatedHeight * aspectRatio;
	}

	return {width: calculatedWidth, height: calculatedHeight};
}

export async function getPdfDoc(srcPdf: PdfInputType): Promise<PDFDocument> {
	const pdfBytes = await convertToBuffer(srcPdf);
	return PDFDocument.load(pdfBytes);
}

export async function signPdfDoc(srcPdf: PdfInputType, signature: PDFSignature[]): Promise<PDFDocument> {
	if (!signature || signature.length < 1) {
		throw new Error('The signatureLocationArray is empty');
	}

	const pdfDoc = await getPdfDoc(srcPdf);
	const pages = pdfDoc.getPages();

	await Promise.all(
		signature.map(async s => {
			const index = s.location.onPage - 1;
			const page = pages[index];
			if (!page) {
				return;
			}

			const {width: pageWidth, height: pageHeight} = page.getSize();
			const {width, height} = s.location;
			let {x, y} = s.location;

			const finalWidth = width ? (width / 100) * pageWidth : 100;
			const finalHeight = height ? (height / 100) * pageHeight : 50;

			x = (x / 100) * pageWidth;
			y = (y / 100) * pageHeight;

			const drawY = pageHeight - y - finalHeight;

			try {
				if (s.signature.type === 'image/png') {
					const imageData = decodeImageData(s.signature.data);
					const pngImage = await pdfDoc.embedPng(imageData);

					const {width: aspectWidth, height: aspectHeight} = calculateAspectRatioFit(pngImage.width, pngImage.height, finalWidth, finalHeight);

					const centerX = x + (finalWidth - aspectWidth) / 2;
					const centerY = drawY + (finalHeight - aspectHeight) / 2;

					page.drawImage(pngImage, {
						x: centerX,
						y: centerY,
						width: aspectWidth,
						height: aspectHeight,
					});

					page.drawRectangle({
						x,
						y: drawY,
						width: finalWidth,
						height: finalHeight,
						borderColor: {type: 'RGB', red: 0.7, green: 0.7, blue: 0.7},
						borderWidth: 0.5,
						borderOpacity: 0.3,
					});
				} else if (s.signature.type === 'image/jpeg') {
					const imageData = decodeImageData(s.signature.data);
					const jpgImage = await pdfDoc.embedJpg(imageData);

					const {width: aspectWidth, height: aspectHeight} = calculateAspectRatioFit(jpgImage.width, jpgImage.height, finalWidth, finalHeight);

					const centerX = x + (finalWidth - aspectWidth) / 2;
					const centerY = drawY + (finalHeight - aspectHeight) / 2;

					page.drawImage(jpgImage, {
						x: centerX,
						y: centerY,
						width: aspectWidth,
						height: aspectHeight,
					});

					page.drawRectangle({
						x,
						y: drawY,
						width: finalWidth,
						height: finalHeight,
						borderColor: {type: 'RGB', red: 0.7, green: 0.7, blue: 0.7},
						borderWidth: 0.5,
						borderOpacity: 0.3,
					});
				} else if (s.signature.type === 'image/svg+xml') {
					throw new Error('SVG signature embedding is not implemented yet');
				}
			} catch (signatureError) {
				throw new Error(
					`Failed to add signature on page ${s.location.onPage}: ${signatureError instanceof Error ? signatureError.message : 'Unknown error'}`,
				);
			}
		}),
	);

	return pdfDoc;
}

export async function signPdf(srcPdf: PdfInputType, signature: PDFSignature[]): Promise<Buffer> {
	const pdfDoc = await signPdfDoc(srcPdf, signature);
	const array = await pdfDoc.save();
	return Buffer.from(array);
}

export async function signPdfStream(srcPdf: PdfInputType, signature: PDFSignature[]): Promise<Readable> {
	const pdf = await signPdf(srcPdf, signature);
	return new Readable({
		read() {
			this.push(pdf);
			this.push(null);
		},
	});
}

export async function getPageCount(srcPdf: PdfInputType): Promise<number> {
	const pdfDoc = await getPdfDoc(srcPdf);
	return pdfDoc.getPageCount();
}

export async function getPageDimensions(srcPdf: PdfInputType, pageNumber: number): Promise<{width: number; height: number}> {
	const pdfDoc = await getPdfDoc(srcPdf);
	const pages = pdfDoc.getPages();
	const pageIndex = pageNumber - 1;
	if (pageIndex < 0 || pageIndex >= pages.length) {
		throw new Error(`Page ${pageNumber} not found in PDF (has ${pages.length} pages)`);
	}
	const page = pages[pageIndex];
	return page.getSize();
}
