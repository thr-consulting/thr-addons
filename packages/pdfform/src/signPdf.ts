import type {ScriptelSchemaType} from '@thx/yup-types';
import {Readable} from 'stream';
import {PDFDocument} from 'pdf-lib';

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

/**
 * Sign a PDF stream with a signature image.
 * @param pdfStream
 * @param signature
 * @param tmpFolderPath - This is required because we need to save a temporary file
 */
export async function signPdf(pdfStream: Readable, signature: PDFSignature[]): Promise<Readable> {
	if (!signature || signature.length < 1) throw new Error('The signatureLocationArray is empty');

	return new Promise((resolve, reject) => {
		const buffer: Buffer[] = [];

		pdfStream.on('data', chunk => {
			buffer.push(chunk);
		});

		pdfStream.on('close', async () => {
			const file = Buffer.concat(buffer);
			const pdfDoc = await PDFDocument.load(file);
			const pages = pdfDoc.getPages();

			await Promise.all(
				signature.map(async s => {
					const index = s.location.onPage - 1;
					if (!pages[index]) return;
					const pngImage = await pdfDoc.embedPng(s.signature.data);
					pages[index].drawImage(pngImage, {
						x: s.location.x,
						y: s.location.y,
						width: s.location.width,
						height: s.location.height,
					});
				}),
			);

			const pdfBytes = await pdfDoc.save();
			const readable = new Readable({
				read() {
					this.push(pdfBytes);
					this.push(null);
				},
			});

			resolve(readable);
		});

		pdfStream.on('error', error => {
			reject(error);
		});
	});
}
