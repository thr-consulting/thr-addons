import {Readable} from 'stream';
import toArray from 'stream-to-array';
import unzipper, {OnFileCallback} from './unzipper';

// Zip file that contains a single file called 'sample.txt' with the text 'This is a sample file.\n'.
const zipFileBuffer = Buffer.from([
	80, 75, 3, 4, 10, 0, 0, 0, 0, 0, 92, 113, 46, 80, 44, 4, 208, 177, 23, 0, 0, 0, 23, 0, 0, 0, 10, 0, 28, 0, 115, 97, 109, 112, 108, 101, 46, 116,
	120, 116, 85, 84, 9, 0, 3, 80, 32, 30, 94, 84, 32, 30, 94, 117, 120, 11, 0, 1, 4, 232, 3, 0, 0, 4, 232, 3, 0, 0, 84, 104, 105, 115, 32, 105, 115,
	32, 97, 32, 115, 97, 109, 112, 108, 101, 32, 102, 105, 108, 101, 46, 10, 80, 75, 1, 2, 30, 3, 10, 0, 0, 0, 0, 0, 92, 113, 46, 80, 44, 4, 208, 177,
	23, 0, 0, 0, 23, 0, 0, 0, 10, 0, 24, 0, 0, 0, 0, 0, 1, 0, 0, 0, 180, 129, 0, 0, 0, 0, 115, 97, 109, 112, 108, 101, 46, 116, 120, 116, 85, 84, 5, 0,
	3, 80, 32, 30, 94, 117, 120, 11, 0, 1, 4, 232, 3, 0, 0, 4, 232, 3, 0, 0, 80, 75, 5, 6, 0, 0, 0, 0, 1, 0, 1, 0, 80, 0, 0, 0, 91, 0, 0, 0, 0, 0,
]);

describe('unzipper', () => {
	it('should process files in a zip file', async () => {
		const readStream = new Readable();
		// eslint-disable-next-line no-underscore-dangle
		readStream._read = () => {};
		readStream.push(zipFileBuffer);
		readStream.push(null);

		const callback: OnFileCallback = ({mimetype, filename, stream}): Promise<void> =>
			new Promise(resolve => {
				expect(mimetype).toBe(undefined);
				expect(filename).toBe('sample.txt');

				toArray(stream, (err, arr) => {
					const fileContents = Buffer.from(arr[0]).toString('utf8');
					expect(fileContents).toBe('This is a sample file.\n');
					resolve();
				});
			});

		await unzipper(readStream, callback);
	});

	it('should fail processing a file that is not a zip file', async () => {
		const readStream = new Readable();
		// eslint-disable-next-line no-underscore-dangle
		readStream._read = () => {};
		readStream.push(Buffer.from([75, 80, 2])); // Something that is NOT a zip file
		readStream.push(null);

		const callback: OnFileCallback = ({mimetype, filename, stream}): Promise<void> =>
			new Promise(resolve => {
				expect(mimetype).toBe(undefined);
				expect(filename).toBe('sample.txt');

				toArray(stream, (err, arr) => {
					const fileContents = Buffer.from(arr[0]).toString('utf8');
					expect(fileContents).toBe('This is a sample file.\n');
					resolve();
				});
			});

		expect.assertions(1);
		try {
			await unzipper(readStream, callback);
		} catch (e) {
			expect(e).toEqual(new Error('end of central directory record signature not found'));
		}
	});
});
