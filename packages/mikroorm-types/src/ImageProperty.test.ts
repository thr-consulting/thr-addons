import {ImageProperty} from './ImageProperty';

describe('ImageProperty', () => {
	it('should convert Image values', () => {
		const image = {
			data: 'data',
			timestamp: 'timestamp',
			type: 'type',
		};

		const prop = new ImageProperty();
		expect(prop.convertToDatabaseValue(image)).toMatchSnapshot();
		expect(prop.convertToJSValue(JSON.stringify(image))).toMatchSnapshot();
		expect(prop.getColumnType()).toMatchSnapshot();
	});

	it('should throw errors on invalid values', () => {
		const prop = new ImageProperty();

		function convertDbValue() {
			const image = 'not an image';
			prop.convertToDatabaseValue(image);
		}
		function convertJsValue() {
			const image = 'not an image';
			prop.convertToJSValue(image);
		}
		function invalidData() {
			const image = {
				data: null,
				timestamp: 'timestamp',
				type: 'type',
			};
			prop.convertToDatabaseValue(image);
		}
		function invalidTimestamp() {
			const image = {
				data: 'data',
				timestamp: null,
				type: 'type',
			};
			prop.convertToDatabaseValue(image);
		}
		function invalidType() {
			const image = {
				data: 'data',
				timestamp: 'timestamp',
				type: null,
			};
			prop.convertToDatabaseValue(image);
		}

		expect(convertDbValue).toThrowErrorMatchingSnapshot();
		expect(convertJsValue).toThrowErrorMatchingSnapshot();
		expect(invalidData).toThrowErrorMatchingSnapshot();
		expect(invalidTimestamp).toThrowErrorMatchingSnapshot();
		expect(invalidType).toThrowErrorMatchingSnapshot();
	});
});
