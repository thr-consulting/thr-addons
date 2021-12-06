import Money from 'js-money';
import {object} from 'yup';
import {moneySchemaType} from './moneySchemaType';

describe('MoneySchemaType', () => {
	it('should validate Money', async () => {
		const schema = object().shape({
			money: moneySchemaType().required(),
		});

		const result = await schema.isValid({
			money: new Money(503, Money.CAD),
		});
		expect(result).toBe(true);
	});

	it('should fail validation', async () => {
		const schema = object().shape({
			money: moneySchemaType().required(),
		});

		const result = await schema.isValid({
			money: 6,
		});
		expect(result).toBe(false);
	});

	it('should cast the data', () => {
		const schema = object().shape({
			moneyLike: moneySchemaType().required(),
		});

		const res = schema.cast({
			moneyLike: {amount: 77, currency: 'CAD'},
		});

		expect(res).toEqual({
			moneyLike: new Money(77, Money.CAD),
		});
	});

	it('should validate max', async () => {
		const schema = object().shape({
			money: moneySchemaType().max(new Money(500, Money.CAD)).required(),
		});

		expect(
			await schema.isValid({
				money: new Money(503, Money.CAD),
			}),
		).toBe(false);
		expect(
			await schema.isValid({
				money: new Money(403, Money.CAD),
			}),
		).toBe(true);
		expect(
			await schema.isValid({
				money: new Money(500, Money.CAD),
			}),
		).toBe(true);
	});

	it('should validate min', async () => {
		const schema = object().shape({
			money: moneySchemaType().min(new Money(500, Money.CAD)).required(),
		});

		expect(
			await schema.isValid({
				money: new Money(503, Money.CAD),
			}),
		).toBe(true);
		expect(
			await schema.isValid({
				money: new Money(403, Money.CAD),
			}),
		).toBe(false);
		expect(
			await schema.isValid({
				money: new Money(500, Money.CAD),
			}),
		).toBe(true);
	});
});
