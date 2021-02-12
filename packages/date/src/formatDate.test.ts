import {Instant, LocalDate, LocalDateTime, ZonedDateTime, ZoneId, ZoneOffset, LocalTime} from '@js-joda/core';
import {formatDate, FormatDateType} from './formatDate';

expect.addSnapshotSerializer({
	test: v => v instanceof Date,
	print: (v: any) => v.toJSON(),
});

expect.addSnapshotSerializer({
	test: v => v instanceof LocalDate || v instanceof LocalDateTime || v instanceof ZonedDateTime,
	print: (v: any) => v.toJSON(),
});

function getDateVars() {
	return {
		// Actual UTC Epoch
		epochDate: new Date('1970-01-01T00:00:00.000Z'),
		epochLocalDateTime: LocalDateTime.ofEpochSecond(0, ZoneOffset.UTC),
		epochZonedDateTime: ZonedDateTime.ofInstant(Instant.EPOCH, ZoneId.UTC),
		epochString: '1970-01-01T00:00:00.000Z',

		// Local time epoch (depends on TZ environment variable)
		localEpochDate: new Date('1970-01-01T00:00:00.000'),
		localEpochLocalDate: LocalDate.ofEpochDay(0),
		localEpochDays: 0,
		localEpochObject: {year: 1970, month: 1, day: 1},
		localEpochLocalDateTime: LocalDateTime.of(1970, 1, 1, 0, 0, 0, 0),
		localEpochStringA: '1970-01-01',
		localEpochStringB: '1970-01-01T00:00:00.000',

		// Local time epoch + 23 hours
		e23Date: new Date('1970-01-01T23:00:00.000'),
		e23LocalDateTime: LocalDateTime.of(1970, 1, 1, 23, 0, 0, 0),
		e23String: '1970-01-01T23:00:00.000',
	};
}

describe('Formatting', () => {
	it('should format with defaults', () => {
		const vars = getDateVars();
		expect(formatDate(vars.epochDate, undefined, ZoneId.UTC)).toMatchSnapshot();
		expect(formatDate(vars.localEpochDate, undefined, ZoneId.SYSTEM)).toMatchSnapshot();
	});
	it('should format with default string', () => {
		const vars = getDateVars();
		expect(formatDate(vars.epochString, {time: true}, ZoneId.UTC)).toMatchSnapshot();
		expect(formatDate(vars.localEpochStringB, {time: true}, ZoneId.SYSTEM)).toMatchSnapshot();
		expect(formatDate(vars.epochString, undefined, ZoneId.UTC)).toMatchSnapshot();
		expect(formatDate(vars.localEpochStringB, undefined, ZoneId.SYSTEM)).toMatchSnapshot();
	});
	it('should format with options', () => {
		const vars = getDateVars();
		expect(formatDate(vars.localEpochLocalDateTime, {type: FormatDateType.short, time: true, date: true})).toMatchSnapshot();
		expect(formatDate(vars.localEpochLocalDateTime, {type: FormatDateType.medium, time: true, date: true})).toMatchSnapshot();
		expect(formatDate(vars.localEpochLocalDateTime, {type: FormatDateType.long, time: true, date: true})).toMatchSnapshot();
	});
	it('should format with individual options', () => {
		const vars = getDateVars();
		expect(formatDate(vars.localEpochLocalDateTime, {type: FormatDateType.short})).toMatchSnapshot();
		expect(formatDate(vars.localEpochLocalDateTime, {type: FormatDateType.medium})).toMatchSnapshot();
		expect(formatDate(vars.localEpochLocalDateTime, {type: FormatDateType.long})).toMatchSnapshot();

		expect(formatDate(vars.localEpochLocalDateTime, {time: true})).toMatchSnapshot();
		expect(formatDate(vars.localEpochLocalDateTime, {time: false})).toMatchSnapshot();

		expect(formatDate(vars.localEpochLocalDateTime, {date: true})).toMatchSnapshot();
		expect(formatDate(vars.localEpochLocalDateTime, {date: false, time: true})).toMatchSnapshot();
		expect(formatDate(vars.localEpochLocalDateTime, {date: false, time: false})).toMatchSnapshot();
	});
	it('should use a custom date format', () => {
		const vars = getDateVars();
		expect(formatDate(vars.localEpochLocalDateTime, {format: 'MMMM_d_yyyy_h_mm_a'})).toMatchSnapshot();
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
	it('should format a LocalDateTime', () => {
		expect(formatDate(LocalDateTime.ofEpochSecond(1740, ZoneOffset.UTC))).toMatchSnapshot();
	});

	it('should format a falsy value', () => {
		expect(formatDate(null)).toEqual('');
	});

	it('should format a LocalTime', () => {
		expect(formatDate(LocalTime.of(0, 0, 0, 0), {time: true, date: false})).toMatchSnapshot();
	});

	// it('should throw an error when a bad value is passed in', () => {
	// 	// @ts-ignore
	// 	expect(formatDate('A')).toThrowErrorMatchingSnapshot(); // .toThrowError('Date could not be converted to a js-joda date');
	// });
});
