/* eslint-disable no-underscore-dangle */
import {Transform} from 'stream';

export default class CounterStream extends Transform {
	_counter: number;

	constructor(opts) {
		super(opts);

		this._counter = 0;
	}

	_transform(chunk, encoding, cb) {
		this._counter += chunk.length;
		cb(null, chunk);
	}

	get counter() {
		return this._counter;
	}
}
