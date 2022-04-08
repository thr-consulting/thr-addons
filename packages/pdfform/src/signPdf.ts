import {randomFilename} from '@thx/random';
import type {ScriptelSchemaType} from '@thx/yup-types';
import fs from 'fs';
import path from 'path';
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
export async function signPdf(pdfStream: Readable, signature: PDFSignature[], tmpFolderPath: string): Promise<Readable> {
	if (!signature || signature.length < 1) throw new Error('The signatureLocationArray is empty');

	const tempFilePath = path.resolve(tmpFolderPath, randomFilename({id: 'temporary', ext: 'pdf'}));
	const writeStream = fs.createWriteStream(tempFilePath);
	pdfStream.pipe(writeStream);

	return new Promise(resolve => {
		fs.readFile(tempFilePath, async (error, file) => {
			if (error) throw error;

			const pdfDoc = await PDFDocument.load(file);
			const pages = pdfDoc.getPages();

			await Promise.all(
				signature.map(async s => {
					if (!pages[s.location.onPage]) return;
					const pngImage = await pdfDoc.embedPng(s.signature.data);
					pages[s.location.onPage].drawImage(pngImage, {
						x: s.location.x,
						y: s.location.y,
						width: s.location.width,
						height: s.location.height,
					});
				}),
			);

			const pdfBytes = await pdfDoc.save();

			fs.unlink(tempFilePath, error1 => {
				if (error1) throw error1;
			});

			resolve(Readable.from(pdfBytes));
		});
	});
}
