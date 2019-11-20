import Money from 'js-money';
import TSchemas from '../src/index';

describe('TSchemas.money', () => {
	it('should validate Money', async () => {
		expect.assertions(2);
		expect(await TSchemas.money().isValid(new Money(500, Money.CAD))).toBe(true);
		expect(await TSchemas.money().isValid({amount: 500, currency: 'CAD'})).toBe(true);
	});
	it('should reject improper money', async () => {
		expect.assertions(3);
		expect(await TSchemas.money().isValid(null)).toBe(false);
		expect(await TSchemas.money().isValid(5.32)).toBe(false);
		expect(await TSchemas.money().isValid({amount: 500})).toBe(false);
	});
});
