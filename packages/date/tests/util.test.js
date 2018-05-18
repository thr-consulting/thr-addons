/* eslint-disable global-require */
import {LocalDate} from 'js-joda';
import moment from 'moment';
import {
	transformDateToLocalDate,
	transformLocalDateToDate,
	transformMomentToLocalDate,
	transformLocalDateToMoment,
	transformMomentsToDate,
	transformDatesToMoment,
	transformEpochIntegerToDate,
	transformLocalDateToEpochInteger,
	transformDateToEpochInteger,
	transformLocalDatesToEpochInteger,
	transformEpochIntegerToLocalDate,
	mapEpochIntegerToLocalDates,
	transformObjectsToLocalDates,
	formatDate,
} from '../src/util';

expect.addSnapshotSerializer({
	test: v => moment.isMoment(v),
	print: v => v.toISOString(),
});
expect.addSnapshotSerializer({
	test: v => Object.prototype.toString.call(v) === '[object Date]',
	print: v => v.toJSON(),
});

describe('Date transforms', () => {
	it('should transform a JS date to a LocalDate', () => {
		const val = transformDateToLocalDate(new Date(2017, 5, 23, 6, 0, 0));
		expect(val).toBeInstanceOf(LocalDate);
		expect(val.dayOfMonth()).toBe(23);
		expect(val.monthValue()).toBe(6);
		expect(val.year()).toBe(2017);
	});

	it('should transform a LocalDate to a Date', () => {
		const val = transformLocalDateToDate(LocalDate.of(2017, 6, 23));
		expect(val).toBeInstanceOf(Date);
		expect(val.getDate()).toBe(23);
		expect(val.getMonth()).toBe(5);
		expect(val.getFullYear()).toBe(2017);
	});

	it('should transform a Moment to a LocalDate', () => {
		const val = transformMomentToLocalDate(moment([2017, 5, 23, 6, 0, 0]));
		expect(val).toBeInstanceOf(LocalDate);
		expect(val.dayOfMonth()).toBe(23);
		expect(val.monthValue()).toBe(6);
		expect(val.year()).toBe(2017);
	});

	it('should transform a LocalDate to a Moment', () => {
		const val = transformLocalDateToMoment(LocalDate.of(2017, 6, 23));
		expect(val).toBeInstanceOf(moment);
		expect(val.date()).toBe(23);
		expect(val.month()).toBe(5);
		expect(val.year()).toBe(2017);
	});

	it('should transform a single JS Date to a single Moment', () => {
		const val = transformDatesToMoment(new Date(2017, 5, 23, 6, 0, 0));
		expect(val).toBeInstanceOf(moment);
		expect(val.date()).toBe(23);
		expect(val.month()).toBe(5);
		expect(val.year()).toBe(2017);
	});

	it('should transform an array of Moments to an array of JS Dates', () => {
		const val = transformMomentsToDate([
			moment([2017, 5, 23, 6, 0, 0]),
			moment([2010, 10, 5, 10, 5, 6]),
		]);
		expect(val[0]).toBeInstanceOf(Date);
		expect(val[1]).toBeInstanceOf(Date);
		expect(val[0].getDate()).toBe(23);
		expect(val[0].getMonth()).toBe(5);
		expect(val[0].getFullYear()).toBe(2017);
		expect(val[1].getDate()).toBe(5);
		expect(val[1].getMonth()).toBe(10);
		expect(val[1].getFullYear()).toBe(2010);
	});

	it('should transform an array of JS Dates to an array of Moments', () => {
		const val = transformDatesToMoment([
			new Date(2017, 5, 23, 6, 0, 0),
			new Date(2010, 10, 5, 10, 5, 6),
		]);
		expect(val[0]).toBeInstanceOf(moment);
		expect(val[1]).toBeInstanceOf(moment);
		expect(val[0].date()).toBe(23);
		expect(val[0].month()).toBe(5);
		expect(val[0].year()).toBe(2017);
		expect(val[1].date()).toBe(5);
		expect(val[1].month()).toBe(10);
		expect(val[1].year()).toBe(2010);
	});

	it('should transform an object with Moment fields to the same object with JS Dates', () => {
		const val = transformMomentsToDate({
			field1: moment([2017, 5, 23, 6, 0, 0]),
			field2: moment([2010, 10, 5, 10, 5, 6]),
		});
		expect(val.field1).toBeInstanceOf(Date);
		expect(val.field2).toBeInstanceOf(Date);
		expect(val.field1.getDate()).toBe(23);
		expect(val.field1.getMonth()).toBe(5);
		expect(val.field1.getFullYear()).toBe(2017);
		expect(val.field2.getDate()).toBe(5);
		expect(val.field2.getMonth()).toBe(10);
		expect(val.field2.getFullYear()).toBe(2010);
	});

	it('should transform an object with JS Date fields to the same object with Moments', () => {
		const val = transformDatesToMoment({
			field1: new Date(2017, 5, 23, 6, 0, 0),
			field2: new Date(2010, 10, 5, 10, 5, 6),
		});
		expect(val.field1).toBeInstanceOf(moment);
		expect(val.field2).toBeInstanceOf(moment);
		expect(val.field1.date()).toBe(23);
		expect(val.field1.month()).toBe(5);
		expect(val.field1.year()).toBe(2017);
		expect(val.field2.date()).toBe(5);
		expect(val.field2.month()).toBe(10);
		expect(val.field2.year()).toBe(2010);
	});

	it('should transform an object with LocalDates to the same object with Epoch Integers', () => {
		const val = transformLocalDatesToEpochInteger({
			field1: LocalDate.ofEpochDay(17400),
			field2: LocalDate.ofEpochDay(13000),
		});
		expect(val.field1).toBe(17400);
		expect(val.field2).toBe(13000);
	});

	it('should transform an epoch integer into a LocalDate', () => {
		const val = transformEpochIntegerToLocalDate(17400);
		expect(val.dayOfMonth()).toBe(22);
		expect(val.monthValue()).toBe(8);
		expect(val.year()).toBe(2017);
	});

	it('should transform an epoch integer into a JS Date', () => {
		const val = transformEpochIntegerToDate(17400);
		expect(val).toBeInstanceOf(Date);
		expect(val.getDate()).toBe(22);
		expect(val.getMonth()).toBe(7);
		expect(val.getFullYear()).toBe(2017);
	});

	it('should transform a LocalDate into an epoch integer', () => {
		const val = transformLocalDateToEpochInteger(LocalDate.ofEpochDay(17400));
		expect(val).toBe(17400);
	});

	it('should transform a JS Date into an epoch integer', () => {
		const val = transformDateToEpochInteger(new Date(2017, 5, 23, 6, 0, 0));
		expect(val).toBe(17340);
	});

	it('should map epoch integers into LocalDates', () => {
		const src1 = {
			field1: 17400,
			field2: {subField2: 17400, subField3: 13000},
			field3: [17400, 13000],
			field4: [17400, 13000],
			field5: [{a: 17400, b: 17400}, {a: 13000, b: 13000}],
			field6: [{a: [{b: [17400, 13000]}]}],
		};
		const val = mapEpochIntegerToLocalDates(src1, [
			'field1',
			'field2.subField2',
			'field3',
			'field5.a',
			'field6.a.b',
		]);
		expect(val.field1).toBeInstanceOf(LocalDate);
		expect(val).toMatchSnapshot();
	});

	it('should transform objects to LocalDates', () => {
		const val = transformObjectsToLocalDates({
			field1: LocalDate.ofEpochDay(17400),
			field2: [LocalDate.ofEpochDay(13000), LocalDate.ofEpochDay(1)],
			field3: '2017-06-23',
			field4: new Date(2017, 5, 23, 6, 0, 0),
		});
		expect(val.field1).toBeInstanceOf(LocalDate);
		expect(val.field2[0]).toBeInstanceOf(LocalDate);
		expect(val.field3).toBeInstanceOf(LocalDate);
		expect(val.field4).toBeInstanceOf(LocalDate);
		expect(val).toMatchSnapshot();
	});
});

describe('Formatting', () => {
	it('should format with defaults', () => {
		expect(formatDate(moment([2017, 5, 23, 6, 0, 0]))).toMatchSnapshot();
	});
	it('should format with options', () => {
		expect(formatDate(moment([2017, 5, 23, 6, 0, 0]), {type: 'short', time: true, date: true})).toMatchSnapshot();
		expect(formatDate(moment([2017, 5, 23, 6, 0, 0]), {type: 'medium', time: true, date: true})).toMatchSnapshot();
		expect(formatDate(moment([2017, 5, 23, 6, 0, 0]), {type: 'long', time: true, date: true})).toMatchSnapshot();
	});
	it('should use a custom date format', () => {
		expect(formatDate(moment([2017, 5, 23, 6, 0, 0]), {format: 'MMMM_D_YYYY_h_mm_a'})).toMatchSnapshot();
	});
	it('should format an integer (epoch days)', () => {
		expect(formatDate(17400)).toMatchSnapshot();
	});
	it('should format a LocalDate', () => {
		expect(formatDate(LocalDate.ofEpochDay(17400))).toMatchSnapshot();
	});
	it('should format a JS Date', () => {
		expect(formatDate(new Date(2017, 5, 23, 6, 0, 0))).toMatchSnapshot();
	});
});
