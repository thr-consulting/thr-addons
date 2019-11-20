import fileType from 'file-type';
import {Transform} from 'stream';

/**
 * @class
 * Determines the mimetype of a stream. Grabs the minimum number of bytes required to determine
 * the mimetype.
 */
export default class FileTypeReadStream extends Transform {
	_buf: Buffer;
	_currentLoc: number;
	mimetype: string;

	constructor(opts?: {}) {
		super(opts);
		this._buf = Buffer.alloc(fileType.minimumBytes);
		this._currentLoc = 0;
		this.mimetype = 'application/octet-stream';
	}

	_transform(chunk, enc, cb) {
		if (this._currentLoc < fileType.minimumBytes) {
			const bytesNeeded = fileType.minimumBytes - this._currentLoc;
			const bytesToGrab = Math.min(bytesNeeded, chunk.length);

			this._buf = Buffer.concat([this._buf.slice(0, this._currentLoc), chunk.slice(0, bytesToGrab)]);
			this._currentLoc = this._currentLoc + bytesToGrab;
		}
		if (this._currentLoc >= fileType.minimumBytes) {
			const a = fileType(this._buf);
			if (a) this.mimetype = a.mime;
		}
		this.push(chunk);
		cb();
	}
}
