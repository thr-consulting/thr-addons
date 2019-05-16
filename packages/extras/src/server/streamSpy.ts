/* eslint-disable no-console */

export function writableSpy(stream, name) {
	stream.on('close', () => console.log(`[${name}] write close`));
	stream.on('error', e => console.log(`[${name}] error: ${e.toString()}`));
	stream.on('finish', () => console.log(`[${name}] finish`));
	stream.on('pipe', () => console.log(`[${name}] pipe`));
	stream.on('unpipe', () => console.log(`[${name}] unpipe`));
}

export function readableSpy(stream, name) {
	stream.on('close', () => console.log(`[${name}] read close`));
	stream.on('data', () => console.log(`[${name}] data`));
	stream.on('end', () => console.log(`[${name}] end`));
	stream.on('error', e => console.log(`[${name}] error: ${e.toString()}`));
	stream.on('readable', () => console.log(`[${name}] readable`));
}
