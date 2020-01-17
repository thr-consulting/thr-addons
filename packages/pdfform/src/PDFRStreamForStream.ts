import hummus, {PDFRStream} from 'hummus';
import {Readable} from 'stream';
import debug from 'debug';

const d = debug('thx.pdfform.PDFRStreamForStream');

/**
 * Returns a pdfrStream when passed a stream
 * @param stream
 */
export async function PDFRStreamForStream(stream: Readable): Promise<PDFRStream> {
	const data: Buffer = await new Promise((resolve, reject) => {
		const array: Uint8Array[] = [];
		stream.on('data', v => array.push(v));
		stream.on('end', () => resolve(Buffer.concat(array)));
		stream.on('error', reject);
	});
	// creates a pdfrStream from a buffer.
	return new hummus.PDFRStreamForBuffer(data);
}
