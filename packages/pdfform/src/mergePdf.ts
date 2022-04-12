import {PDFDocument} from 'pdf-lib';
import type {PdfInputType} from './types';
import {getPdfDoc} from './getPdfDoc';

export async function mergePdf(pdfSrc: PdfInputType[]) {
	const pdfDoc = await PDFDocument.create();

	const srcDocs = await Promise.all(pdfSrc.map(async srcDoc => getPdfDoc(srcDoc)));

	await Promise.all(
		srcDocs.map(async srcDoc => {
			const indices = srcDoc.getPageIndices();
			const pages = await pdfDoc.copyPages(srcDoc, indices);
			pages.forEach(page => pdfDoc.addPage(page));
		}),
	);

	return pdfDoc;
}
