import {fileTypeFromBuffer, fileTypeFromFile, fileTypeFromStream} from 'file-type';
import type {Readable} from 'node:stream';
import {checkForPdf} from './checkForPdf';

export async function mimetypeFrom(input: string | Buffer | Readable): Promise<string | undefined> {
	if (await checkForPdf(input)) {
		return 'application/pdf';
	}

	if (typeof input === 'string') {
		const m = await fileTypeFromFile(input);
		return m?.mime.toString();
	}
	if (Buffer.isBuffer(input)) {
		const m = await fileTypeFromBuffer(input);
		return m?.mime.toString();
	}
	const m = await fileTypeFromStream(input);
	return m?.mime.toString();
}
