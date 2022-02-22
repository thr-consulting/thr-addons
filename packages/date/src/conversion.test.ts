import {Instant, LocalDate, LocalDateTime, LocalTime, ZonedDateTime, ZoneId, ZoneOffset} from '@js-joda/core';
import {expect, config} from 'chai';
import {register, unregister} from 'timezone-mock';
import {toDate, toEpochDay, toLocalDate, toLocalDateTime, toLocalTime} from './conversion';

config.truncateThreshold = 0;

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
		localEpochObject: {_year: 1970, _month: 1, _day: 1},
		localEpochLocalDateTime: LocalDateTime.of(1970, 1, 1, 0, 0, 0, 0),
		localEpochStringA: '1970-01-01',
		localEpochStringB: '1970-01-01T00:00:00.000',

		// Local time epoch + 23 hours
		e23Date: new Date('1970-01-01T23:00:00.000'),
		e23LocalDateTime: LocalDateTime.of(1970, 1, 1, 23, 0, 0, 0),
		e23String: '1970-01-01T23:00:00.000',

		// Local time
		midnight: LocalTime.of(0, 0, 0, 0),
		midnightStringA: '00:00',
		midnightStringB: '00:00:00',
		midnightStringC: '00:00:00.000000000',
	};
}

function testLocalDateConversion() {
	const vars = getDateVars();
	const epoch = LocalDate.of(1970, 1, 1);

	expect(toLocalDate(vars.epochDate, ZoneId.UTC)).to.deep.equal(epoch);
	expect(toLocalDate(vars.epochDate, ZoneId.UTC)).to.deep.equal(epoch);
	expect(toLocalDate(vars.epochLocalDateTime)).to.deep.equal(epoch);
	expect(toLocalDate(vars.epochZonedDateTime)).to.deep.equal(epoch);
	expect(toLocalDate(vars.epochString)).to.deep.equal(epoch);

	const localEpoch = LocalDate.of(1970, 1, 1);
	expect(toLocalDate(vars.localEpochDate)).to.deep.equal(localEpoch);
	expect(toLocalDate(vars.localEpochLocalDate)).to.deep.equal(localEpoch);
	expect(toLocalDate(vars.localEpochDays)).to.deep.equal(localEpoch);
	expect(toLocalDate(vars.localEpochObject)).to.deep.equal(localEpoch);
	expect(toLocalDate(vars.localEpochLocalDateTime)).to.deep.equal(localEpoch);
	expect(toLocalDate(vars.localEpochStringA)).to.deep.equal(localEpoch);
	expect(toLocalDate(vars.localEpochStringB)).to.deep.equal(localEpoch);

	const e23 = LocalDate.of(1970, 1, 1);
	expect(toLocalDate(vars.e23Date)).to.deep.equal(e23);
	expect(toLocalDate(vars.e23LocalDateTime)).to.deep.equal(e23);
	expect(toLocalDate(vars.e23String)).to.deep.equal(e23);
}

function testEpochDayConversion() {
	const vars = getDateVars();
	const epoch = 0;
	expect(toEpochDay(vars.epochDate, ZoneId.UTC)).to.deep.equal(epoch);
	expect(toEpochDay(vars.epochLocalDateTime)).to.deep.equal(epoch);
	expect(toEpochDay(vars.epochZonedDateTime)).to.deep.equal(epoch);
	expect(toEpochDay(vars.epochString)).to.deep.equal(epoch);

	const localEpoch = 0;
	expect(toEpochDay(vars.localEpochDate)).to.deep.equal(localEpoch);
	expect(toEpochDay(vars.localEpochLocalDate)).to.deep.equal(localEpoch);
	expect(toEpochDay(vars.localEpochDays)).to.deep.equal(localEpoch);
	expect(toEpochDay(vars.localEpochObject)).to.deep.equal(localEpoch);
	expect(toEpochDay(vars.localEpochLocalDateTime)).to.deep.equal(localEpoch);
	expect(toEpochDay(vars.localEpochStringA)).to.deep.equal(localEpoch);
	expect(toEpochDay(vars.localEpochStringB)).to.deep.equal(localEpoch);

	const e23 = 0;
	expect(toEpochDay(vars.e23LocalDateTime)).to.deep.equal(e23);
	expect(toEpochDay(vars.e23Date)).to.deep.equal(e23);
	expect(toEpochDay(vars.e23String)).to.deep.equal(e23);
}

function testLocalDateTimeConversion() {
	const vars = getDateVars();
	const epoch = LocalDateTime.of(LocalDate.of(1970, 1, 1), LocalTime.of(0, 0, 0, 0));
	expect(toLocalDateTime(vars.epochDate, ZoneId.UTC)).to.deep.equal(epoch);
	expect(toLocalDateTime(vars.epochLocalDateTime)).to.deep.equal(epoch);
	expect(toLocalDateTime(vars.epochZonedDateTime)).to.deep.equal(epoch);
	expect(toLocalDateTime(vars.epochString)).to.deep.equal(epoch);

	const localEpoch = LocalDateTime.of(LocalDate.of(1970, 1, 1), LocalTime.of(0, 0, 0, 0));
	expect(toLocalDateTime(vars.localEpochDate, ZoneId.SYSTEM)).to.deep.equal(localEpoch);
	expect(toLocalDateTime(vars.localEpochLocalDate)).to.deep.equal(localEpoch);
	expect(toLocalDateTime(vars.localEpochDays)).to.deep.equal(localEpoch);
	expect(toLocalDateTime(vars.localEpochObject)).to.deep.equal(localEpoch);
	expect(toLocalDateTime(vars.localEpochLocalDateTime)).to.deep.equal(localEpoch);
	expect(toLocalDateTime(vars.localEpochStringA)).to.deep.equal(localEpoch);
	expect(toLocalDateTime(vars.localEpochStringB)).to.deep.equal(localEpoch);

	const e23 = LocalDateTime.of(LocalDate.of(1970, 1, 1), LocalTime.of(23, 0, 0, 0));
	expect(toLocalDateTime(vars.e23LocalDateTime)).to.deep.equal(e23);
	expect(toLocalDateTime(vars.e23Date)).to.deep.equal(e23);
	expect(toLocalDateTime(vars.e23String)).to.deep.equal(e23);
}

function testDateConversion() {
	const vars = getDateVars();
	const epoch = new Date('1970-01-01T00:00:00.000Z');
	expect(toDate(vars.epochDate)).to.deep.equal(epoch);
	// expect(toDate(vars.epochLocalDateTime)).to.deep.equal(epoch);
	// expect(toDate(vars.epochZonedDateTime)).to.deep.equal(epoch);
	expect(toDate(vars.epochString)).to.deep.equal(epoch);

	const localEpoch = new Date('1970-01-01T00:00:00.000');
	expect(toDate(vars.localEpochDate)).to.deep.equal(localEpoch);
	expect(toDate(vars.localEpochLocalDate)).to.deep.equal(localEpoch);
	expect(toDate(vars.localEpochDays)).to.deep.equal(localEpoch);
	expect(toDate(vars.localEpochObject)).to.deep.equal(localEpoch);
	expect(toDate(vars.localEpochLocalDateTime)).to.deep.equal(localEpoch);
	// expect(toDate(vars.localEpochStringA)).to.deep.equal(localEpoch);
	expect(toDate(vars.localEpochStringB)).to.deep.equal(localEpoch);

	const e23 = new Date('1970-01-01T23:00:00.000');
	expect(toDate(vars.e23LocalDateTime)).to.deep.equal(e23);
	expect(toDate(vars.e23Date)).to.deep.equal(e23);
	expect(toDate(vars.e23String)).to.deep.equal(e23);
}

function testTimeConversion() {
	const vars = getDateVars();
	const midnight = LocalTime.of(0, 0, 0, 0);
	expect(toLocalTime(vars.midnight)).to.deep.equal(midnight);
	expect(toLocalTime(vars.midnightStringA)).to.deep.equal(midnight);
	expect(toLocalTime(vars.midnightStringB)).to.deep.equal(midnight);
	expect(toLocalTime(vars.midnightStringC)).to.deep.equal(midnight);
	expect(toLocalTime(vars.epochString)).to.deep.equal(midnight);
	expect(toLocalTime(vars.epochLocalDateTime)).to.deep.equal(midnight);
	expect(toLocalTime(vars.epochZonedDateTime)).to.deep.equal(midnight);
	expect(toLocalTime(vars.epochDate, ZoneId.UTC)).to.deep.equal(midnight);
}

describe('US/Pacific Date Conversion', () => {
	register('US/Pacific');
	it('should convert to LocalDate (US/Pacific)', testLocalDateConversion);
	it('should convert to epoch day (US/Pacific)', testEpochDayConversion);
	it('should convert to LocalDateTime (US/Pacific)', testLocalDateTimeConversion);
	it('should convert to Date (US/Pacific)', testDateConversion);
	it('should convert to LocalTime (US/Pacific)', testTimeConversion);
	unregister();
});

describe('US/Eastern Date Conversion', () => {
	register('US/Eastern');
	// console.log(getDateVars().localEpochDate.valueOf());
	it('should convert to LocalDate (US/Eastern)', testLocalDateConversion);
	it('should convert to epoch day (US/Eastern)', testEpochDayConversion);
	it('should convert to LocalDateTime (US/Eastern)', testLocalDateTimeConversion);
	it('should convert to Date (US/Eastern)', testDateConversion);
	it('should convert to LocalTime (US/Eastern)', testTimeConversion);
	unregister();
});

describe('Brazil/East Date Conversion', () => {
	register('Brazil/East');
	// console.log(getDateVars().localEpochDate.valueOf());
	it('should convert to LocalDate (Brazil/East)', testLocalDateConversion);
	it('should convert to epoch day (Brazil/East)', testEpochDayConversion);
	it('should convert to LocalDateTime (Brazil/East)', testLocalDateTimeConversion);
	it('should convert to Date (Brazil/East)', testDateConversion);
	it('should convert to LocalTime (Brazil/East)', testTimeConversion);
	unregister();
});

describe('UTC Date Conversion', () => {
	register('UTC');
	// console.log(getDateVars().localEpochDate.valueOf());
	it('should convert to LocalDate (UTC)', testLocalDateConversion);
	it('should convert to epoch day (UTC)', testEpochDayConversion);
	it('should convert to LocalDateTime (UTC)', testLocalDateTimeConversion);
	it('should convert to Date (UTC)', testDateConversion);
	it('should convert to LocalTime (UTC)', testTimeConversion);
	unregister();
});

describe('Europe/London Date Conversion', () => {
	register('Europe/London');
	// console.log(getDateVars().localEpochDate.valueOf());
	it('should convert to LocalDate (Europe/London)', testLocalDateConversion);
	it('should convert to epoch day (Europe/London)', testEpochDayConversion);
	it('should convert to LocalDateTime (Europe/London)', testLocalDateTimeConversion);
	it('should convert to Date (Europe/London)', testDateConversion);
	it('should convert to LocalTime (Europe/London)', testTimeConversion);
	unregister();
});

describe('Conversion Errors', () => {
	it('should throw errors when converting', () => {
		expect(() => toLocalDate(null)).to.throw('Cannot convert value to LocalDate');
		expect(() => toLocalDate(undefined)).to.throw('Cannot convert value to LocalDate');
		expect(() => toLocalDate(0.5)).to.throw("Invalid value: '1.5' is a float");
		expect(() => toEpochDay(null)).to.throw('Cannot convert value to epoch integer');
		expect(() => toLocalDateTime(null)).to.throw('Cannot convert value to LocalDateTime');
		expect(() => toDate(null)).to.throw('Cannot convert value to Date');
		expect(() => toLocalTime(null)).to.throw('Cannot convert value to LocalTime');
	});
});
