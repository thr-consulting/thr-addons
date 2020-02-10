import {randomBytes, pseudoRandomBytes} from 'crypto';
import {formatDate} from '@thx/date';
import {ZonedDateTime} from '@js-joda/core';

const letters = 'abcdefghijklmnopqrstuvwxyz';
const alphanumeric = 'abcdefghijklmnopqrstuvwxyz0123456789';

export function randomId(digits = 24): string {
	const numBytes = Math.ceil(digits / 2);
	let bytes;
	try {
		bytes = randomBytes(numBytes);
	} catch (e) {
		bytes = pseudoRandomBytes(numBytes);
	}
	return bytes.toString('hex').substring(0, digits);
}

export function randomAlphanumericCharacter(): string {
	return alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
}

export function randomLetterCharacter(): string {
	return letters.charAt(Math.floor(Math.random() * letters.length));
}

export function randomAlphanumeric(length = 1): string {
	let code = '';
	for (let i = 0; i < length; i += 1) {
		code += randomAlphanumericCharacter();
	}
	return code;
}

export function randomLetters(length = 1): string {
	let code = '';
	for (let i = 0; i < length; i += 1) {
		code += randomLetterCharacter();
	}
	return code;
}

export function randomFilename({id, ext, random}: {id?: string; ext?: string; random?: number} = {}) {
	const dateStr = formatDate(ZonedDateTime.now(), {format: 'yyyyMMdd-HHmmssZ'});
	const idStr = id ? `${id}-` : '';
	const rndStr = typeof random === 'number' && random <= 0 ? '' : `-${randomAlphanumeric(random || 8)}`;
	const extStr = ext ? `.${ext}` : '';

	return `${idStr}${dateStr}${rndStr}${extStr}`;
}
