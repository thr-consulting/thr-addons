import {fileTypeFromFile} from 'file-type';
import {checkForPdf} from './checkForPdf';

export async function mimetypeFrom(path: string): Promise<string | undefined> {
	if (await checkForPdf(path)) {
		return 'application/pdf';
	}
	const m = await fileTypeFromFile(path);
	return m?.mime.toString();
}
