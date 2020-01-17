import crypto from 'crypto';
import {ZonedDateTime} from '@js-joda/core';
import {
	randomId,
	randomAlphanumericCharacter,
	randomLetterCharacter,
	randomAlphanumeric,
	randomLetters,
	randomFilename,
} from './index';

const origMath = Math;
const origCrypto = {
	randomBytes: crypto.randomBytes,
	pseudoRandomBytes: crypto.pseudoRandomBytes,
};
const origZonedDateTimeNow = ZonedDateTime.now;

function mockRandom() {
	const mockMath = Object.create(global.Math);
	mockMath.random = () => 0.5;
	global.Math = mockMath;

	const mockedCrypto = (numBytes: number) => {
		const m = [];
		for (let i = 0; i < numBytes; i++) {
			m.push(0x05);
		}
		return Buffer.from(m);
	};
	crypto.randomBytes = mockedCrypto;
	crypto.pseudoRandomBytes = mockedCrypto;

	ZonedDateTime.now = () => ZonedDateTime.parse('1970-01-01T00:00:00.000Z');
}

function unmockRandom() {
	global.Math = origMath;
	crypto.randomBytes = origCrypto.randomBytes;
	crypto.pseudoRandomBytes = origCrypto.pseudoRandomBytes;
	ZonedDateTime.now = origZonedDateTimeNow;
}

describe('random', () => {
	it('should generate a random id', () => {
		mockRandom();
		expect(randomId()).toBe('050505050505050505050505');
		expect(randomId(3)).toBe('050');
		unmockRandom();
	});

	it('should be generate random alphanumeric character', () => {
		mockRandom();
		expect(randomAlphanumericCharacter()).toBe('s');
		unmockRandom();
	});

	it('should be generate random letter character', () => {
		mockRandom();
		expect(randomLetterCharacter()).toBe('n');
		unmockRandom();
	});

	it('should be generate random alphanumeric string', () => {
		mockRandom();
		expect(randomAlphanumeric()).toBe('s');
		expect(randomAlphanumeric(10)).toBe('ssssssssss');
		unmockRandom();
	});

	it('should be generate random letter string', () => {
		mockRandom();
		expect(randomLetters()).toBe('n');
		expect(randomLetters(10)).toBe('nnnnnnnnnn');
		unmockRandom();
	});

	it('should be generate random filename defaults', () => {
		mockRandom();
		expect(randomFilename()).toBe('19700101-000000+0000-ssssssss');
		unmockRandom();
	});

	it('should be generate random filename with id', () => {
		mockRandom();
		expect(randomFilename({id: 'blah'})).toBe('blah-19700101-000000+0000-ssssssss');
		unmockRandom();
	});

	it('should be generate random filename with extension', () => {
		mockRandom();
		expect(randomFilename({ext: 'txt'})).toBe('19700101-000000+0000-ssssssss.txt');
		unmockRandom();
	});

	it('should be generate random filename with different number of random chars', () => {
		mockRandom();
		expect(randomFilename({random: 5})).toBe('19700101-000000+0000-sssss');
		expect(randomFilename({random: 0})).toBe('19700101-000000+0000');
		unmockRandom();
	});
});
