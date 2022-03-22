import {sequential} from '@thx/promise-sequential';
import {randomFilename} from '@thx/random';
import type {ScriptelSchemaType} from '@thx/yup-types';
import fs from 'fs';
import type {PDFPageModifier} from 'hummus';
import hummus from 'hummus';
import path from 'path';
import type {Readable} from 'stream';
import {PDFRStreamForStream} from './PDFRStreamForStream';

const {PDFWStreamForFile, createWriterToModify, PDFPageModifier: PDFPgMod} = hummus;

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
	// https://github.com/galkahana/HummusJS
	const outStream = new PDFWStreamForFile(tempFilePath);
	const inStream = await PDFRStreamForStream(pdfStream);
	const pdfWriter = createWriterToModify(inStream, outStream);

	let currentPage = 0;
	let pageModifier: PDFPageModifier;
	// I want to create an image for each signature and then draw them both to the stream.
	const drawingArray = signature
		.sort((a, b) => a.location.onPage - b.location.onPage)
		.map((val, index) => async () => {
			const {
				signature: {data},
				location: {width = 400, height = 100, x = 1, y = 1, onPage = 1},
			} = val;
			const isPageNumDifferent = currentPage.toString() !== onPage.toString();
			const isNextPageNumDifferent = signature[index + 1] && signature[index + 1].location.onPage.toString() !== onPage.toString();

			// if the page is not the same as the previous one then we want to create a new pageModifier.
			if (isPageNumDifferent) {
				pageModifier = new PDFPgMod(pdfWriter, onPage - 1, true);
				currentPage = val.location.onPage;
			}

			if (!data) throw new Error('The signature data field is empty');

			// create the signature image.
			const signatureBuffer = Buffer.from(data.replace('data:image/png;base64,', ''), 'base64');
			const signatureFilePath = path.resolve(tmpFolderPath, randomFilename({id: 'signature', ext: 'png'}));
			await fs.promises.writeFile(signatureFilePath, signatureBuffer);

			// I am giving it the height of 100 because the ratio is set to being proportional,
			// which alleviates the reason for having a height prop.
			const cxt = pageModifier.startContext().getContext();
			cxt.drawImage(x, y, signatureFilePath, {
				transformation: {width, height, proportional: true},
			});

			// we only want to write page if the next page is a new one or if this page is the last one.
			if (isNextPageNumDifferent || signature.length === index + 1) {
				pageModifier.endContext().writePage();
			} else pageModifier.endContext();
			await fs.promises.unlink(signatureFilePath);
		});

	await sequential(drawingArray);
	pdfWriter.end();

	const returnStream = fs.createReadStream(tempFilePath);
	// if I don't have the on data event, then the on close event doesn't get called.
	returnStream.on('data', () => {});
	returnStream.on('close', () =>
		fs.unlink(tempFilePath, err => {
			if (err) throw new Error(err.message);
		}),
	);
	return returnStream;
}
