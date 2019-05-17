import {advanceTo, clear} from 'jest-date-mock';
import {getNumberOfDaysInMonth} from '../src';

describe('getNumberOfDaysInMonth', () => {
	it('should return the number 31 for January', () => {
		expect(getNumberOfDaysInMonth({month: 1})).toMatchSnapshot();
	});

	it('should return the number 28 for February', () => {
		expect(getNumberOfDaysInMonth({month: 2})).toMatchSnapshot();
	});

	it('should return the number 30 for April', () => {
		expect(getNumberOfDaysInMonth({month: 4})).toMatchSnapshot();
	});

	it('should return the number 13 for this month', () => {
		advanceTo(new Date(2019, 5, 13, 0, 0, 0));
		expect(getNumberOfDaysInMonth({month: 6, limitToCurrentDay: true})).toMatchSnapshot();
		clear();
	});

	it('should return an array of 30 for this month', () => {
		advanceTo(new Date(2019, 5, 13, 0, 0, 0));
		expect(getNumberOfDaysInMonth({month: 6, asArray: true})).toMatchSnapshot();
	});

	it('should return an array of 5 for this month', () => {
		advanceTo(new Date(2019, 5, 5, 0, 0, 0));
		expect(getNumberOfDaysInMonth({month: 6, limitToCurrentDay: true, asArray: true})).toMatchSnapshot();
	});
});
