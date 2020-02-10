import {Readable} from 'stream';
import {spawn} from 'child_process';
import generateFdfFromJson from './generateFdfFromJson';

/**
 * Take mapped pdf form data and fill a PDF form, returning the read stream
 * @param sourcePdfFilename
 * @param mapData
 */
export async function fillPdf(sourcePdfFilename: string, mapData: {[key: string]: string}): Promise<Readable> {
	// implement taking a source PDF filename and mapped data from mapPdfFormData and returning a PDF stream
	return new Promise((resolve, reject) => {
		const fdfData = generateFdfFromJson(mapData);
		const options = [sourcePdfFilename, 'fill_form', '-', 'output', '-', 'flatten'];

		const child = spawn('pdftk', options);

		child.stdin.write(fdfData);
		child.on('error', reject);
		child.stdin.on('error', reject);
		child.stdin.on('close', () => resolve(child.stdout));
		child.stdin.end();
	});
}
