import {formatMoney} from './formatMoney';
import {toMoney} from './toMoney';

describe('Formatting', () => {
	it('should return an empty string for a falsy value', () => {
		expect(formatMoney(null)).toEqual('');
	});

	it('should format a Money value', () => {
		expect(formatMoney(toMoney())).toMatchSnapshot();
	});

	it('should add the currency symbol to the formatting', () => {
		expect(formatMoney(toMoney(), true)).toMatchSnapshot();
	});
});
