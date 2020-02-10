import {RandomAccessReader} from 'yauzl';
import {Volume} from 'memfs/lib/volume';

export default class ZipReader extends RandomAccessReader {
	private _fs: Volume;
	private _file: string;

	/**
	 * Used to read zip files from any FS like system.
	 * @param fs
	 * @param filename
	 */
	constructor(fs: Volume, filename: string) {
		super();

		this._fs = fs;
		this._file = filename;
	}

	_readStreamForRange(start: number, end: number) {
		// log().silly(` readStreamForRange: ${start} - ${end}`);
		return this._fs.createReadStream(this._file, {start, end: end - 1});
	}
}
