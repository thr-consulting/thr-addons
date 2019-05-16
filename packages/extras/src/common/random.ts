import {randomBytes, pseudoRandomBytes} from 'crypto';

const letters = 'abcdefghijklmnopqrstuvwxyz';
const alphanumeric = 'abcdefghijklmnopqrstuvwxyz0123456789';

export function randomId(digits: number = 24): string {
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

export function randomAlphanumeric(length: number = 1): string {
	let code = '';
	for (let i = 0; i < length; i += 1) {
		code += randomAlphanumericCharacter();
	}
	return code;
}

export function randomLetters(length: number = 1): string {
	let code = '';
	for (let i = 0; i < length; i += 1) {
		code += randomLetterCharacter();
	}
	return code;
}
