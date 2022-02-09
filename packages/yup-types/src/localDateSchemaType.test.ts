import {LocalDate} from '@js-joda/core';
import {object} from 'yup';
import {localDateSchemaType} from './localDateSchemaType';

describe('LocalDateSchemaType', () => {
	it('should validate LocalDate', async () => {
		const schema = object().shape({
			date: localDateSchemaType().required(),
		});

		const result = await schema.isValid({
			date: LocalDate.of(2020, 2, 4),
		});
		expect(result).toBe(true);
	});

	it('should fail validation', async () => {
		const schema = object().shape({
			date: localDateSchemaType().required(),
		});

		const result = await schema.isValid({
			date: 6,
		});
		expect(result).toBe(false);
	});
});
