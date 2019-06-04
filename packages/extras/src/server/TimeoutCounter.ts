import {EventEmitter} from 'events';

export default class TimeoutCounter extends EventEmitter {
	_counter: number;
	_timeoutDelay: number;
	_timeoutId: ReturnType<typeof setTimeout>;

	/**
	 * Initialize a TimeoutCounter with ms delay.
	 * @param timeout
	 */
	constructor(timeout = 1000) {
		super();

		this._counter = 0;
		this._timeoutDelay = timeout;
		this._timeoutId = setTimeout(this.timeoutHandler, timeout);
	}

	/**
	 * Internal function that is called when the timer runs out.
	 */
	timeoutHandler = () => {
		if (this._counter !== 0) {
			this._counter = 0;
			this.emit('timeout');
		}
	};

	/**
	 * Increase the counter by one. This also resets the timer.
	 */
	add() {
		this._counter += 1;
		clearTimeout(this._timeoutId);
		this._timeoutId = setTimeout(this.timeoutHandler, this._timeoutDelay);
		this.emit('add', this._counter);
	}

	/**
	 * Decrease the counter by one. This also resets the timer. When the last
	 * item is removed, it fires the 'finish' event.
	 */
	remove() {
		if (this._counter > 1) {
			// Decrement counter
			clearTimeout(this._timeoutId);
			this._timeoutId = setTimeout(this.timeoutHandler, this._timeoutDelay);
			this._counter -= 1;
		} else if (this._counter === 1) {
			// Decrement counter to 0, emit finish event
			this._counter = 0;
			clearTimeout(this._timeoutId);
			this.emit('finish');
		}
	}

	/**
	 * Cancel the timeout counter and reset it.
	 */
	cancel() {
		clearTimeout(this._timeoutId);
		this._counter = 0;
	}
}
