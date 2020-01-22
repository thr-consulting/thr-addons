/* eslint-disable no-underscore-dangle */
import {Transform, TransformOptions, TransformCallback} from 'stream';

export class CounterStream extends Transform {
	private _counter: number;

	constructor(opts?: TransformOptions) {
		super(opts);

		this._counter = 0;
	}

	_transform(chunk: any, encoding: string, cb: TransformCallback) {
		this._counter += chunk.length;
		cb(null, chunk);
	}

	get counter() {
		return this._counter;
	}
}
