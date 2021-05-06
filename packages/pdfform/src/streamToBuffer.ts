import debug from 'debug';
import type {Readable} from 'stream';

export async function streamToBuffer(stream: Readable) {
	return new Promise((resolve, reject) => {
		const buffers: any = [];
		stream.on('data', de => {
			buffers.push(de);
		});
		stream.on('end', () => resolve(Buffer.concat(buffers)));
		stream.on('error', err => {
			reject(err);
		});
	});
}
