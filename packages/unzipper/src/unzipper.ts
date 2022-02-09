import debug from 'debug';
import {Volume} from 'memfs';
import path from 'path';
import type {Readable} from 'stream';
import yauzl from 'yauzl';
import ZipReader from './ZipReader';

const d = debug('thx.unzipper.unzipper');

export type OnFileCallback = (fileStreamData: {stream: Readable; filename: string; mimetype?: string}) => Promise<void>;

/**
 * Unzips a zip file calling a callback for each file in the zip file.
 * @param {Readable} zipReadStream - The readable zip file stream.
 * @param {OnFileCallback} onFile - Called for each file in the zip file.
 * @return {Promise<void>} Returns a promise when the zip file is complete.
 */
export default function unzipper(zipReadStream: Readable, onFile: OnFileCallback): Promise<void> {
	return new Promise((resolveUnzipper, rejectUnzipper) => {
		d('Unzipping zip file...');
		const mfs = new Volume();
		const zipMemWriteStream = mfs.createWriteStream('/zip');

		// Event: called when finished writing zip file to memory fs
		zipMemWriteStream.on('finish', () => {
			d(`Finished writing zip to memory. ${zipMemWriteStream.bytesWritten} bytes.`);
			const zipMemReadStream = new ZipReader(mfs, '/zip');
			yauzl.fromRandomAccessReader(
				zipMemReadStream,
				zipMemWriteStream.bytesWritten,
				{
					autoClose: true,
					lazyEntries: true,
				},
				(err, zipfile) => {
					if (err || !zipfile) {
						rejectUnzipper(err);
						return;
					}

					d('> Opened zip file from memory');

					// Read first entry
					zipfile.readEntry();

					// Event: called when a folder or file is found in a zip file
					zipfile.on('entry', entry => {
						if (/\/$/.test(entry.fileName)) {
							// folder entry
							zipfile.readEntry();
						} else {
							// file entry
							zipfile.openReadStream(entry, (zerr, zipEntryFileReadStream) => {
								if (zerr) throw zerr;
								if (!zipEntryFileReadStream) throw new Error(`Error opening read stream from zipped file: ${entry.fileName}`);
								d(`> Reading file in zip: ${entry.fileName}`);

								onFile({
									stream: zipEntryFileReadStream,
									filename: path.basename(entry.fileName),
								}).then(() => {
									zipfile.readEntry();
								});
							});
						}
					});

					// Event: called when the zip file is closed
					zipfile.on('close', () => {
						d('> Zip file closed');
						// Remove the zipfile from memory fs and resolve promise
						resolveUnzipper();
						mfs.reset();
					});

					// Event: called when zip file has an error
					zipfile.on('error', rejectUnzipper);
				},
			);
		});

		// Start piping zip file to memory fs
		zipReadStream.pipe(zipMemWriteStream);
	});
}
