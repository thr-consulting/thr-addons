import {LocalDate} from '@js-joda/core';
import {LocalDateProperty} from './LocalDateProperty';

describe('LocalDateProperty', () => {
	it('should convert LocalDate values', () => {
		const date = LocalDate.ofEpochDay(100);

		const prop = new LocalDateProperty();
		expect(prop.convertToDatabaseValue(date)).toMatchSnapshot();
		expect(prop.convertToJSValue(date)).toMatchSnapshot();
		expect(prop.getColumnType()).toMatchSnapshot();
	});

	it('should throw errors on invalid values', () => {
		const date = 'not a date';
		const prop = new LocalDateProperty();

		function convertDbValue() {
			prop.convertToDatabaseValue(date);
		}
		function convertJsValue() {
			prop.convertToJSValue(date);
		}

		expect(convertDbValue).toThrowErrorMatchingSnapshot();
		expect(convertJsValue).toThrowErrorMatchingSnapshot();
	});
});
