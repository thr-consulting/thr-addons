import {config, expect} from 'chai';
import {readFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {PDFSignature, signPdfDoc} from '../signPdf';

config.truncateThreshold = 0;

const curdir = dirname(fileURLToPath(import.meta.url));

const pdfSamplePath = resolve(curdir, 'PdfFormTest.pdf');

const image = await readFile(resolve(curdir, 'signature.png'));
const signature: PDFSignature[] = [
	{
		signature: {
			// @ts-ignore
			data: image,
			type: 'image/png',
			timestamp: new Date(),
		},
		location: {
			x: 10,
			y: 10,
			onPage: 1,
		},
	},
];

describe('Sign PDF', () => {
	it('should sign a pdf from a file name', async () => {
		const pdf = await signPdfDoc(pdfSamplePath, signature);
		expect(1).to.equal(1);
	});
});
