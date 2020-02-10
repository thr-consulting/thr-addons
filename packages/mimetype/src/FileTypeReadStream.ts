import {fromBuffer, FileTypeResult, minimumBytes} from 'file-type';
import {Transform} from 'stream';

/**
 * @class
 * Determines the mimetype of a stream. Grabs the minimum number of bytes required to determine
 * the mimetype.
 */
export default class FileTypeReadStream extends Transform {
	private _buf: Buffer;
	private _currentLoc: number;

	constructor(opts?: {}) {
		super(opts);
		this._buf = Buffer.alloc(minimumBytes);
		this._currentLoc = 0;
	}

	_transform(chunk: any, enc: string, cb: (error?: Error | null, data?: any) => void) {
		if (this._currentLoc < minimumBytes) {
			const bytesNeeded = minimumBytes - this._currentLoc;
			const bytesToGrab = Math.min(bytesNeeded, chunk.length);

			this._buf = Buffer.concat([this._buf.slice(0, this._currentLoc), chunk.slice(0, bytesToGrab)]);
			this._currentLoc += bytesToGrab;
		}
		if (this._currentLoc >= minimumBytes) {
			this.emit('ready', this._buf);
		}
		this.push(chunk);
		cb();
	}

	getMagicBuffer(): Buffer {
		return this._buf;
	}

	async getMimetype(): Promise<FileTypeResult | undefined> {
		return fromBuffer(this._buf);
	}
}
