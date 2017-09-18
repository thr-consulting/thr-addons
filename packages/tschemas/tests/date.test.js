import moment from 'moment';
import {LocalDate} from 'js-joda';
import TSchemas from '../src/index';

describe('TSchemas.moment', () => {
	it('should validate moments', async () => {
		expect.assertions(1);
		expect(await TSchemas.moment().isValid(moment())).toBe(true);
	});
	it('should reject improper dates', async () => {
		expect.assertions(1);
		expect(await TSchemas.moment().isValid(null)).toBe(false);
	});
});

describe('TSchemas.localDate', () => {
	it('should validate LocalDates', async () => {
		expect.assertions(2);
		expect(await TSchemas.localDate().isValid(LocalDate.now())).toBe(true);
		expect(await TSchemas.localDate().isValid({_year: 2017, _month: 6, _day: 23})).toBe(true);
	});
	it('should reject improper dates', async () => {
		expect.assertions(2);
		expect(await TSchemas.localDate().isValid(5, {strict: true})).toBe(false);
		expect(await TSchemas.localDate().isValid(null)).toBe(false);
	});
});
