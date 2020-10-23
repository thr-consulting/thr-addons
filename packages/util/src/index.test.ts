import {ExcludeFalse, valuesToFunctions} from './index';

describe('ExcludeFalse', () => {
	it('should exclude false values', () => {
		const bool1 = true;
		const bool2 = false;
		const arr = ['string A', 555, null, undefined, bool1 && 'string B', bool2 && 'string C'];

		expect(arr.filter((Boolean as any) as ExcludeFalse)).toMatchSnapshot();
	});
});

describe('valuesToFunctions', () => {
	it('should convert values to functions', () => {
		const obj = {
			field1: 'string1',
			field2: 555,
		};
		const newObj = valuesToFunctions(obj);

		expect(newObj).toMatchSnapshot();
		expect(newObj.field1()).toEqual('string1');
		expect(newObj.field2()).toEqual(555);
	});
});
