import {isString} from './typeguards';

describe('isString', () => {
	it('should typeguard a string', () => {
		const isstring = 'fdafdas';
		const isnotstring = 555;

		expect(isString(isstring)).toBe(true);
		expect(isString(isnotstring)).toBe(false);
	});
});
