import {isString} from 'lodash-es';
import {Buffer} from 'node:buffer';
import {readFile} from 'node:fs/promises';
import {Readable} from 'node:stream';
import {PDFDocument} from 'pdf-lib';
import type {PdfInputType} from './types';

export async function getPdfDoc(srcPdf: PdfInputType) {
	if (isString(srcPdf)) {
		return PDFDocument.load(await readFile(srcPdf));
	}
	if (srcPdf instanceof Readable) {
		const chunks: Buffer[] = [];
		return PDFDocument.load(
			await new Promise((resolve, reject) => {
				srcPdf.on('data', chunk => chunks.push(Buffer.from(chunk)));
				srcPdf.on('error', err => reject(err));
				srcPdf.on('end', () => resolve(Buffer.concat(chunks)));
			}),
		);
	}
	return PDFDocument.load(srcPdf);
}
