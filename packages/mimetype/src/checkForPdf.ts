import {spawn} from 'cross-spawn';

export async function checkForPdf(path: string): Promise<boolean> {
	return new Promise(resolve => {
		const args = [path];
		const proc = spawn('pdfinfo', args);

		proc.on('close', (code: number) => {
			if (code === 0) {
				resolve(true);
			}
			resolve(false);
		});
	});
}
