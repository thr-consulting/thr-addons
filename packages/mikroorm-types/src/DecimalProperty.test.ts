import {DecimalProperty} from './DecimalProperty';

describe('DecimalProperty', () => {
	it('should convert Decimal values', () => {
		const decimal = 1.1;
		const prop = new DecimalProperty();

		expect(prop.convertToDatabaseValue(decimal)).toBe('1.1');
		expect(prop.convertToJSValue('2.2')).toBe(2.2);
		expect(prop.getColumnType()).toBe('decimal');
	});

	it('should throw errors on invalid values', () => {
		const decimal = 'not money';
		const prop = new DecimalProperty();

		function convertDbValue() {
			prop.convertToDatabaseValue(decimal);
		}
		function convertJsValue() {
			prop.convertToJSValue(decimal);
		}

		expect(convertDbValue).toThrowErrorMatchingSnapshot();
		expect(convertJsValue).toThrowErrorMatchingSnapshot();
	});
});
