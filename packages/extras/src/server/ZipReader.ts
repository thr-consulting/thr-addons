import {RandomAccessReader} from 'yauzl';

export default class ZipReader extends RandomAccessReader {
	_fs: any;
	_file: string;

	/**
	 * Used to read zip files from any FS like system.
	 * @param fs
	 * @param filename
	 */
	constructor(fs, filename) {
		super();

		this._fs = fs;
		this._file = filename;
	}

	_readStreamForRange(start, end) {
		// log().silly(` readStreamForRange: ${start} - ${end}`);
		return this._fs.createReadStream(this._file, {start, end: end - 1});
	}
}
