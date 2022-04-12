import {isString} from 'lodash-es';
import {Buffer} from 'node:buffer';
import {Readable} from 'node:stream';
import {PDFDocument, PDFDropdown, PDFTextField} from 'pdf-lib';
import {getPdfDoc} from './getPdfDoc';
import type {PdfInputType} from './types';

export type PdfFormDataType = Record<string, string | boolean | number | undefined>;

export async function fillPdfFormDoc(srcPdf: PdfInputType, data: PdfFormDataType): Promise<PDFDocument> {
	const pdfDoc = await getPdfDoc(srcPdf);

	const form = pdfDoc.getForm();
	Object.keys(data).forEach(key => {
		const value = data[key];
		if (isString(value)) {
			const field = form.getField(key);
			if (field instanceof PDFTextField) {
				form.getTextField(key).setText(value);
			} else if (field instanceof PDFDropdown) {
				form.getDropdown(key).select(value);
			}
		} else if (typeof value === 'boolean') {
			if (value) {
				form.getCheckBox(key).check();
			}
		} else if (typeof value === 'number') {
			form.getTextField(key).setText(value.toString());
		}
	});
	return pdfDoc;
}

export async function fillPdfForm(srcPdf: PdfInputType, data: PdfFormDataType): Promise<Buffer> {
	const array = await (await fillPdfFormDoc(srcPdf, data)).save();
	return Buffer.from(array);
}

export async function fillPdfFormStream(srcPdf: PdfInputType, data: PdfFormDataType): Promise<Readable> {
	const pdf = await fillPdfForm(srcPdf, data);
	return new Readable({
		read() {
			this.push(pdf);
			this.push(null);
		},
	});
}
