import getCountryCode from '../src/currencyCountry';

describe('currencyCountry', () => {
	it('should return the correct country code', () => {
		expect(getCountryCode('CAD')).toEqual('ca');
	});
});
