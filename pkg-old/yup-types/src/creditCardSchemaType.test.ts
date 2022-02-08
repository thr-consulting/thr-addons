import {object} from 'yup';
import {creditCardSchemaType} from './creditCardSchemaType';

describe('CreditCardSchemaType', () => {
	it('should validate credit card numbers', async () => {
		const schema = object().shape({
			visa: creditCardSchemaType().required(),
			mc: creditCardSchemaType().required(),
			amex: creditCardSchemaType().required(),
			dinerclub: creditCardSchemaType().required(),
			carteblanche: creditCardSchemaType().required(),
			discover: creditCardSchemaType().required(),
			enroute: creditCardSchemaType().required(),
			jcb: creditCardSchemaType().required(),
		});

		const result = await schema.isValid({
			visa: '4012888888881881',
			mc: '5500000000000004',
			amex: '340000000000009',
			dinerclub: '30000000000004',
			carteblanche: '30000000000004',
			discover: '6011000000000004',
			enroute: '201400000000009',
			jcb: '3566002020360505',
		});
		expect(result).toBe(true);
	});

	it('should fail validation', async () => {
		const schema = object().shape({
			visa: creditCardSchemaType().required(),
			mc: creditCardSchemaType().required(),
			amex: creditCardSchemaType().required(),
			dinerclub: creditCardSchemaType().required(),
			carteblanche: creditCardSchemaType().required(),
			discover: creditCardSchemaType().required(),
			enroute: creditCardSchemaType().required(),
			jcb: creditCardSchemaType().required(),
		});

		const result = await schema.isValid({
			visa: '0123456789ABCDEF',
			mc: '0123456789ABCDEF',
			amex: '0123456789ABCDEF',
			dinerclub: '0123456789ABCDEF',
			carteblanche: '0123456789ABCDEF',
			discover: '0123456789ABCDEF',
			enroute: '0123456789ABCDEF',
			jcb: '0123456789ABCDEF',
		});
		expect(result).toBe(false);
	});
});
