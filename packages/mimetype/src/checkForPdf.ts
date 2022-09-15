import {spawn} from 'cross-spawn';
import {Readable} from 'stream';

export async function checkForPdf(input: Readable | string | Buffer): Promise<boolean> {
	return new Promise(resolve => {
		// Convert buffer to stream if needed
		const inp = input instanceof Buffer ? Readable.from(input) : input;

		const args = inp instanceof Readable ? ['--'] : [inp];
		const proc = spawn('pdfinfo', args);

		proc.on('close', (code: number) => {
			if (code === 0) {
				resolve(true);
			}
			resolve(false);
		});

		if (inp instanceof Readable) {
			inp.pipe(proc.stdin);
		}
	});
}
