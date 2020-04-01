import {Readable} from 'stream';
import debug from 'debug';

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
