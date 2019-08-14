import fs from 'fs';
import util from 'util';
import debug from 'debug';
import fmkdirp from 'mkdirp';
import {Readable} from 'stream';
import path from 'path';
import {randomFilename} from '../common/random';

const d = debug('app.lib.fsStuff');

const rdFile = util.promisify(fs.readFile);
const wrtFile = util.promisify(fs.writeFile);

/**
 * Promise version of readFile
 * @param thePath
 */
export async function readFile(thePath: string): Promise<string> {
	return rdFile(thePath, 'utf8')
		.catch(err => { throw new Error(err); });
}

/**
 * Promise version of writeFile
 * @param thePath
 * @param theBuffer
 */
export async function writeFile(thePath: string, theBuffer: string | Buffer) {
	return wrtFile(thePath, theBuffer)
		.catch(err => { throw new Error(err); });
}

/**
 * Copies a source file to a destination.
 * @param from
 * @param to
 * @return {Promise}
 */
export async function copyFile(from, to): Promise<void> {
	return new Promise((resolve, reject) => {
		fs.access(from, isMissing => {
			if (!isMissing) {
				fs.copyFile(from, to, err => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			} else {
				reject(isMissing);
			}
		});
	});
}

/**
 * Creates a directory path
 * @param thepath
 */
export async function mkdirp(thepath: string) {
	await new Promise((resolve, reject) => {
		fmkdirp(thepath, null, err => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

/**
 * Checks if a file exists
 * @param {string} thePath
 * @return {Promise<boolean>}
 */
export async function fileExists(thePath: string): Promise<boolean> {
	return new Promise(resolve => {
		fs.access(thePath, isMissing => {
			if (isMissing) {
				resolve(false);
			} else {
				resolve(true);
			}
		});
	});
}

/**
 * Promise version of unlink
 * @param thePath
 */
export async function rmFile(thePath: string): Promise<void> {
	return new Promise((resolve, reject) => {
		fs.unlink(thePath, err => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

/**
 * Removes multiple files
 * @param files
 */
export async function rmFiles(files: string[]): Promise<void> {
	await Promise.all(files.map(rmFile));
}

/**
 * Promise version of file writer that writes a stream
 * @param fname
 * @param iStream
 */
export async function writeStream(fname, iStream: Readable) {
	return new Promise((resolve, reject) => {
		const oStream = fs.createWriteStream(fname);
		oStream.on('close', resolve);
		oStream.on('error', reject);
		iStream.on('error', reject);
		iStream.pipe(oStream);
	});
}

/**
 * Streams to a random filename in a tmp folder
 * @param iStream
 * @param tmpFolder
 */
export async function streamToTmp(iStream: Readable, tmpFolder: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const fname = path.resolve(tmpFolder, randomFilename());
		const oStream = fs.createWriteStream(fname);
		oStream.on('error', reject);
		iStream.on('error', reject);
		iStream.on('close', () => {
			resolve(fname);
		});
		iStream.pipe(oStream);
	});
}

/**
 * Streams multiple streams to tmp files
 * @param iStreams
 * @param tmpFolder
 */
export async function streamsToTmpFiles(iStreams: Readable[], tmpFolder: string): Promise<string[]> {
	return Promise.all(iStreams.map(stream => streamToTmp(stream, tmpFolder)));
}
