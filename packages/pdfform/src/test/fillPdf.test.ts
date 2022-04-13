import {config, expect} from 'chai';
import {input} from 'node-pdftk';
import {createReadStream} from 'node:fs';
import {readFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {fillPdfFormDoc} from '../fillPdf';

config.truncateThreshold = 0;

const curdir = dirname(fileURLToPath(import.meta.url));

const pdfSamplePath = resolve(curdir, 'PdfFormTest.pdf');

export async function buildPdf(buffers: Buffer[]): Promise<Buffer> {
	return input(buffers).output();
}

describe('Fill PDF Form', () => {
	const data = {
		givenName: 'John',
		familyName: 'Doe',
		address1: '1 First Street',
		address2: 'Section 1',
		postcode: 'R1R 1R1',
		city: 'Steinbach',
		country: 'Canada',
		gender: 'Man',
		height: 125,
		drivingLicense: true,
	};

	it('should fill a form from a file name', async () => {
		const pdf = await fillPdfFormDoc(pdfSamplePath, data);
		expect(pdf.getForm().getTextField('givenName').getText()).to.equal('John');
		expect(pdf.getForm().getDropdown('country').getSelected()[0]).to.equal('Canada');
		expect(pdf.getForm().getTextField('height').getText()).to.equal('125');
	});

	it('should fill a form from a read stream', async () => {
		const stream = createReadStream(pdfSamplePath);
		const pdf = await fillPdfFormDoc(stream, data);
		expect(pdf.getForm().getTextField('givenName').getText()).to.equal('John');
		expect(pdf.getForm().getDropdown('country').getSelected()[0]).to.equal('Canada');
		expect(pdf.getForm().getTextField('height').getText()).to.equal('125');
	});

	it('should fill a form from a buffer', async () => {
		const file = await readFile(pdfSamplePath);
		const pdf = await fillPdfFormDoc(file, data);
		expect(pdf.getForm().getTextField('givenName').getText()).to.equal('John');
		expect(pdf.getForm().getDropdown('country').getSelected()[0]).to.equal('Canada');
		expect(pdf.getForm().getTextField('height').getText()).to.equal('125');
	});
});
