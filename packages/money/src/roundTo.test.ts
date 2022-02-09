import {roundTo} from './roundTo';

describe('Rounding', () => {
	it('should round down', () => {
		expect(roundTo(3.45245, 2)).toEqual(3.45);
	});

	it('should round up', () => {
		expect(roundTo(3.45745, 2)).toEqual(3.46);
	});

	it('should round up on halfway', () => {
		expect(roundTo(3.45545, 2)).toEqual(3.46);
	});

	it('should round to any number of decimals', () => {
		expect(roundTo(3.75727263656237, 8)).toEqual(3.75727264);
	});
});
