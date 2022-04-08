import {Readable} from 'stream';
import {PDFDocument} from 'pdf-lib';
import fs from 'fs';

async function fillPdf(sourcePdfFilename: string, data: {[key: string]: string | boolean | undefined}): Promise<Uint8Array> {
	return new Promise(resolve => {
		fs.readFile(sourcePdfFilename, async (error, file) => {
			if (error) throw error;
			const pdfDoc = await PDFDocument.load(file);
			const form = pdfDoc.getForm();
			Object.keys(data).forEach(key => {
				const value = data[key];
				if (value === true) {
					form.getCheckBox(key).check();
				} else if (typeof value === 'string') {
					form.getTextField(key).setText(value);
				}
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
export async function pdfForStream(sourcePdfFilename: string, data: {[key: string]: string | boolean | undefined}): Promise<Readable> {
	const buffer = await fillPdf(sourcePdfFilename, data);
	return new Readable({
		read() {
			this.push(buffer);
			this.push(null);
		},
	});
}

/**
 * Take mapped pdf form data and fill a PDF form, returning a buffer
 * @param sourcePdfFilename
 * @param data
 */
export async function pdfForBuffer(sourcePdfFilename: string, data: {[key: string]: string | boolean | undefined}): Promise<Buffer> {
	return Buffer.from(await fillPdf(sourcePdfFilename, data));
}

/**
 * Take in array of buffers and return single buffer
 * @param buffers
 */
export function buildPdf(buffers: Buffer[]): Buffer {
	return Buffer.concat(buffers);
}
