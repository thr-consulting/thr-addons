import {object} from 'yup';
import {scriptelSchemaType} from './scriptelSchemaType';

describe('MoneySchemaType', () => {
	it('should validate Money', async () => {
		const schema = object().shape({
			sig: scriptelSchemaType().required(),
		});

		const result = await schema.isValid({
			sig: {
				data: 'datavalue',
				timestamp: new Date(),
			},
		});
		expect(result).toBe(true);
	});

	it('should fail validation', async () => {
		const schema = object().shape({
			money: scriptelSchemaType().required(),
		});

		const result = await schema.isValid({
			money: 6,
		});
		expect(result).toBe(false);
	});
});
