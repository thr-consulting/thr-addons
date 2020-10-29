import {JsonStringProperty} from './JsonStringProperty';

describe('JsonStringProperty', () => {
	it('should convert values', () => {
		const obj = {
			field1: 'field1value',
			field2: {
				field3: 'field3value',
			},
		};

		const prop = new JsonStringProperty();
		expect(prop.convertToDatabaseValue(obj)).toMatchSnapshot();
		expect(prop.convertToJSValue(JSON.stringify(obj))).toMatchSnapshot();
		expect(prop.getColumnType()).toMatchSnapshot();
	});
});
