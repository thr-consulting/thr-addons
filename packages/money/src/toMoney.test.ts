import Money from 'js-money';
import Currencies from 'js-money/lib/currency';
import {toMoney} from './toMoney';

describe('Convert to Money', () => {
	it('should accept a normal Money instance', () => {
		const ret = toMoney(new Money(100, 'CAD'));
		expect(ret).toMatchSnapshot();
		expect(ret).toBeInstanceOf(Money);
	});

	it('should return 0.00 canadian dollars by default', () => {
		const ret = toMoney();
		expect(ret).toMatchSnapshot();
		expect(ret).toBeInstanceOf(Money);
	});

	it('should make a Money from an object', () => {
		const ret = toMoney({amount: 500, currency: 'USD'});
		expect(ret).toMatchSnapshot();
		expect(ret).toBeInstanceOf(Money);
	});

	it('should make a Money from a decimal', () => {
		const ret = toMoney(5.32);
		expect(ret).toMatchSnapshot();
		expect(ret).toBeInstanceOf(Money);
	});

	it('should make a Money from a string', () => {
		const ret = toMoney('5.32');
		expect(ret).toMatchSnapshot();
		expect(ret).toBeInstanceOf(Money);
	});

	it('should make a Money with currency specified', () => {
		const ret = toMoney(6.32, Currencies.USD);
		expect(ret).toMatchSnapshot();
		expect(ret).toBeInstanceOf(Money);
	});

	it('should throw an error if something wrong is passed to it', () => {
		// @ts-ignore
		const a = () => toMoney({something: 7.23});
		expect(a).toThrowErrorMatchingSnapshot();
	});
});
