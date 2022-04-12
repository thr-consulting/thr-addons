import type {ScriptelSchemaType} from '@thx/yup-types';
import {Buffer} from 'node:buffer';
import {Readable} from 'node:stream';
import type {PDFDocument} from 'pdf-lib';
import {getPdfDoc} from './getPdfDoc';
import type {PdfInputType} from './types';

export interface PDFSignature {
	signature: ScriptelSchemaType;
	location: {
		width?: number;
		height?: number;
		x: number;
		y: number;
		onPage: number;
	};
}

export async function signPdfDoc(srcPdf: PdfInputType, signature: PDFSignature[]): Promise<PDFDocument> {
	if (!signature || signature.length < 1) throw new Error('The signatureLocationArray is empty');

	const pdfDoc = await getPdfDoc(srcPdf);
	const pages = pdfDoc.getPages();

	await Promise.all(
		signature.map(async s => {
			const index = s.location.onPage - 1;
			if (!pages[index]) return;

			if (s.signature.type === 'image/png') {
				const pngImage = await pdfDoc.embedPng(s.signature.data);
				pages[index].drawImage(pngImage, {
					x: s.location.x,
					y: s.location.y,
					width: s.location.width,
					height: s.location.height,
				});
			} else if (s.signature.type === 'image/svg+xml') {
				throw new Error('SVG signature embedding is not implemented yet');
			}
		}),
	);

	return pdfDoc;
}

export async function signPdf(srcPdf: PdfInputType, signature: PDFSignature[]): Promise<Buffer> {
	const array = await (await signPdfDoc(srcPdf, signature)).save();
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
