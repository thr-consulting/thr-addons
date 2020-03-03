import {object} from 'yup';
import {LocalTime} from '@js-joda/core';
import {LocalTimeSchemaType} from './LocalTimeSchemaType';

describe('LocalTimeSchemaType', () => {
	it('should validate LocalTime', async () => {
		const schema = object().shape({
			time: new LocalTimeSchemaType().required(),
		});

		const result = await schema.isValid({
			time: LocalTime.of(23, 55),
		});
		expect(result).toBe(true);
	});

	it('should fail validation', async () => {
		const schema = object().shape({
			date: new LocalTimeSchemaType().required(),
		});

		const result = await schema.isValid({
			date: 6,
		});
		expect(result).toBe(false);
	});
});
