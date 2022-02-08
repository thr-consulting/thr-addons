import {toMoney} from '@thx/money';
import {MoneyProperty} from './MoneyProperty';

describe('MoneyProperty', () => {
	it('should convert Money values', () => {
		const money = toMoney(100);

		const prop = new MoneyProperty();
		expect(prop.convertToDatabaseValue(money)).toMatchSnapshot();
		expect(prop.convertToJSValue(money)).toMatchSnapshot();
		expect(prop.getColumnType()).toMatchSnapshot();
	});

	it('should throw errors on invalid values', () => {
		const money = 'not money';
		const prop = new MoneyProperty();

		function convertDbValue() {
			prop.convertToDatabaseValue(money);
		}
		function convertJsValue() {
			prop.convertToJSValue(money);
		}

		expect(convertDbValue).toThrowErrorMatchingSnapshot();
		expect(convertJsValue).toThrowErrorMatchingSnapshot();
	});
});
