import type {LocalDate} from '@js-joda/core';
import {numberToHexString} from '@thx/util';
import type Money from 'js-money';
import Crc32 from 'crc-32';
import type {Institution} from './types';

export function generateDate(date: LocalDate): string {
	return `0${date.year().toFixed().slice(2, 4)}${date.dayOfYear().toFixed().padStart(3, '0')}`;
}

export function generateAmount(amount: Money, length: number): string {
	return amount.toString().replace('.', '').padStart(length, '0');
}

export function generateNumber(num: number, length: number): string {
	return num.toFixed().padStart(length, '0');
}

export function generateString(str: string, length: number): string {
	return str.padEnd(length, ' ');
}

export function generateInstitution(institution: Institution) {
	return `0${generateNumber(institution.route, 3)}${generateNumber(institution.transit, 5)}`;
}

export function filler(numChars: number): string {
	return ''.padStart(numChars, ' ');
}

export function generateCrossRef(id: string, date: LocalDate) {
	const crc = Crc32.str(id);
	const crcHex = numberToHexString(crc);
	const days = date.toEpochDay();
	const daysHex = numberToHexString(days).padStart(8, '0');
	return `000${daysHex}${crcHex}`;
}
