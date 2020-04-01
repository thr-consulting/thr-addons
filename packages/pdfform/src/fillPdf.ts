// @ts-ignore
import pdftk from 'node-pdftk';
import {Readable} from 'stream';
import {spawn} from 'child_process';
import generateFdfFromJson from './generateFdfFromJson';

/**
 * Take mapped pdf form data and fill a PDF form, returning a read stream
 * @param sourcePdfFilename
 * @param data
 */
export async function pdfForStream(sourcePdfFilename: string, data: {[key: string]: string | undefined}): Promise<Readable> {
	// implement taking a source PDF filename and mapped data from mapPdfFormData and returning a PDF stream
	return new Promise((resolve, reject) => {
		const fdfData = generateFdfFromJson(data);
		const options = [sourcePdfFilename, 'fill_form', '-', 'output', '-', 'flatten'];

		const child = spawn('pdftk', options);

		child.stdin.write(fdfData);
		child.on('error', reject);
		child.stdin.on('error', reject);
		child.stdin.on('close', () => resolve(child.stdout));
		child.stdin.end();
	});
}

/**
 * Take mapped pdf form data and fill a PDF form, returning a buffer
 * @param sourcePdfFilename
 * @param data
 */
export function pdfForBuffer(sourcePdfFilename: string, data: {[key: string]: string | undefined}): Buffer {
	return pdftk
		.input(sourcePdfFilename)
		.fillForm(data)
		.flatten()
		.output();
}

/**
 * Take in array of buffers and return single buffer
 * @param buffers
 */
export function buildPdf(buffers: Buffer[]): Buffer {
	return pdftk.input(buffers).output();
}
