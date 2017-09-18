import Money from 'js-money';
import {
	makeMoney,
	roundTo,
	formatMoney,
	transformObjectsToMoney,
} from '../src/util';

describe('Make Money', () => {
	it('should return 0.00 canadian dollars by default', () => {
		const ret = makeMoney();
		expect(ret).toMatchSnapshot();
		expect(ret).toBeInstanceOf(Money);
	});

	it('should make a Money from an object', () => {
		const ret = makeMoney({amount: 500, currency: 'USD'});
		expect(ret).toMatchSnapshot();
		expect(ret).toBeInstanceOf(Money);
	});

	it('should make a Money from a decimal', () => {
		const ret = makeMoney(5.32);
		expect(ret).toMatchSnapshot();
		expect(ret).toBeInstanceOf(Money);
	});

	it('should make a Money with currency specified', () => {
		const ret = makeMoney(6.32, 'USD');
		expect(ret).toMatchSnapshot();
		expect(ret).toBeInstanceOf(Money);
	});
});

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

describe('Formatting', () => {
	it('should format a Money value', () => {
		expect(formatMoney(makeMoney())).toMatchSnapshot();
	});

	it('should add the currency symbol to the formatting', () => {
		expect(formatMoney(makeMoney(), true)).toMatchSnapshot();
	});
});

describe('Transforms', () => {
	it('should transform objects to Money', () => {
		const val = transformObjectsToMoney({
			field1: {amount: 500, currency: 'CAD'},
			field2: [{amount: 500, currency: 'CAD'}],
		});
		expect(val.field1).toBeInstanceOf(Money);
		expect(val.field2[0]).toBeInstanceOf(Money);
		expect(val).toMatchSnapshot();
	});
});
