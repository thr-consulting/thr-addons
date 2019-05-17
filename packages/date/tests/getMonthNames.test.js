import {advanceTo, clear} from 'jest-date-mock';
import {getMonthNames} from '../src';

describe('getMonthNames', () => {
	it('should return an array of 12 month names', () => {
		expect(getMonthNames()).toMatchSnapshot();
	});

	it('should return an array of first 6 month names', () => {
		advanceTo(new Date(2019, 6, 1, 0, 0, 0));
		expect(getMonthNames({year: 2019})).toMatchSnapshot();
		clear();
	});

	it('should return an empty array', () => {
		advanceTo(new Date(2019, 6, 1, 0, 0, 0));
		expect(getMonthNames({year: 2020})).toMatchSnapshot();
		clear();
	});

	it('should return an array of twelve months of current year', () => {
		advanceTo(new Date(2019, 6, 1, 0, 0, 0));
		expect(getMonthNames({year: 2019, limitToCurrentMonth: false})).toMatchSnapshot();
		clear();
	});
});
