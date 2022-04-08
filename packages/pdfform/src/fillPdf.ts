import {Readable} from 'stream';
import {PDFDocument} from 'pdf-lib';
import fs from 'fs';

async function fillPdf(sourcePdfFilename: string, data: {[key: string]: string | undefined}): Promise<Uint8Array> {
	return new Promise(resolve => {
		fs.readFile(sourcePdfFilename, async (error, file) => {
			if (error) throw error;
			const pdfDoc = await PDFDocument.load(file);
			const form = pdfDoc.getForm();
			Object.keys(data).forEach(key => {
				form.getTextField(key).setText(data[key]);
			});
			const pdfBytes = await pdfDoc.save();
			resolve(pdfBytes);
		});
	});
}

/**
 * Take mapped pdf form data and fill a PDF form, returning a read stream
 * @param sourcePdfFilename
 * @param data
 */
export async function pdfForStream(sourcePdfFilename: string, data: {[key: string]: string | undefined}): Promise<Readable> {
	return Readable.from(await fillPdf(sourcePdfFilename, data));
}

/**
 * Take mapped pdf form data and fill a PDF form, returning a buffer
 * @param sourcePdfFilename
 * @param data
 */
export async function pdfForBuffer(sourcePdfFilename: string, data: {[key: string]: string | undefined}): Promise<Buffer> {
	return Buffer.from(await fillPdf(sourcePdfFilename, data));
}

/**
 * Take in array of buffers and return single buffer
 * @param buffers
 */
export function buildPdf(buffers: Buffer[]): Buffer {
	return Buffer.concat(buffers);
}
