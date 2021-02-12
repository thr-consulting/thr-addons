import {LocalDate, LocalDateTime, nativeJs, ZonedDateTime, ZoneId, LocalTime} from '@js-joda/core';

/*
  Possible Date Types

  LocalDate - js-joda date with no time
  Object - Object with fields that look like LocalDate internals. See ILocalDateLike below.
  Epoch Days - js-joda number of days since epoch (Jan 1, 1970)
  LocalDateTime - js-joda date with time (no zone)
  ZonedDateTime - js-joda date with time and zone
  Date - javascript date with time (no zone)
  String - ISO8601 date string (without time, with time, with time and zone)
  LocalTime - js-joda time (no zone)
 */

export interface ILocalDateLike {
	year: number;
	month: number;
	day: number;
}

export function isLocalDateLike(date: any): date is ILocalDateLike {
	return (
		date !== null &&
		date !== undefined &&
		typeof date === 'object' &&
		typeof date.year !== 'undefined' &&
		typeof date.month !== 'undefined' &&
		typeof date.day !== 'undefined'
	);
}

export interface ILocalTimeLike {
	hour: number;
	minute: number;
	second: number;
	nano: number;
}

export function isLocalTimeLike(time: any): time is ILocalTimeLike {
	return (
		time !== null &&
		time !== undefined &&
		typeof time === 'object' &&
		typeof time.hour !== 'undefined' &&
		typeof time.minute !== 'undefined' &&
		typeof time.second !== 'undefined' &&
		typeof time.nano !== 'undefined'
	);
}

// const iso8601Regex = /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
const iso8601DateOnly = /^\d{4}-\d{2}-\d{2}$/;
const iso8601ContainsZone = /(Z|[+-]\d{2}:\d{2})$/;
const iso8601TimeOnly = /^\d{2}:\d{2}(:\d{2}(\.\d{1,9})?)?$/;

export function toLocalDate(date: any, zone: ZoneId = ZoneId.SYSTEM): LocalDate {
	if (date instanceof LocalDate) {
		return date;
	}
	if (date instanceof LocalDateTime) {
		// This chops the time off, because 'local' datetime === 'local date.
		return date.toLocalDate();
	}
	if (date instanceof ZonedDateTime) {
		// Unsure of this
		return date.toLocalDate();
	}
	if (typeof date === 'number') {
		return LocalDate.ofEpochDay(date);
	}
	if (date instanceof Date) {
		// Javascript dates are evil. They assume you are in SYSTEM zone when reading, but can set as any zone.
		return LocalDate.from(nativeJs(date, zone));
	}
	if (isLocalDateLike(date)) {
		// eslint-disable-next-line no-underscore-dangle
		return LocalDate.of(date.year, date.month, date.day);
	}
	if (typeof date === 'string') {
		if (iso8601DateOnly.test(date)) {
			return LocalDate.parse(date);
		}
		if (iso8601ContainsZone.test(date)) {
			return ZonedDateTime.parse(date).toLocalDate();
		}
		return LocalDateTime.parse(date).toLocalDate();
	}
	throw new Error('Cannot convert value to LocalDate');
}

export function toEpochDay(date: any, zone: ZoneId = ZoneId.SYSTEM): number {
	if (typeof date === 'number') {
		return date;
	}
	if (date instanceof LocalDate) {
		return date.toEpochDay();
	}
	if (date instanceof LocalDateTime || date instanceof ZonedDateTime || date instanceof Date || isLocalDateLike(date) || typeof date === 'string') {
		return toLocalDate(date, zone).toEpochDay();
	}

	throw new Error('Cannot convert value to epoch integer');
}

export function toLocalDateTime(date: any, zone: ZoneId = ZoneId.SYSTEM): LocalDateTime {
	if (date instanceof LocalDateTime) {
		return date;
	}
	if (date instanceof ZonedDateTime) {
		return date.toLocalDateTime();
	}
	if (date instanceof Date) {
		return LocalDateTime.from(nativeJs(date, zone));
	}
	if (date instanceof LocalDate || isLocalDateLike(date) || typeof date === 'number') {
		const localDate = toLocalDate(date);
		return LocalDateTime.of(localDate.year(), localDate.monthValue(), localDate.dayOfMonth(), 0, 0, 0, 0);
	}
	if (typeof date === 'string') {
		if (iso8601DateOnly.test(date)) {
			return toLocalDateTime(LocalDate.parse(date));
		}
		if (iso8601ContainsZone.test(date)) {
			return ZonedDateTime.parse(date).toLocalDateTime();
		}
		return LocalDateTime.parse(date);
	}
	throw new Error('Cannot convert value to LocalDateTime');
}

export function toDate(date: any): Date {
	if (date instanceof Date) {
		return date;
	}
	if (date instanceof LocalDate || date instanceof ZonedDateTime) {
		return new Date(date.year(), date.monthValue() - 1, date.dayOfMonth());
	}
	if (date instanceof LocalDateTime) {
		return new Date(date.year(), date.monthValue() - 1, date.dayOfMonth(), date.hour(), date.minute(), date.second(), date.nano() / 1000000);
	}
	if (date instanceof LocalTime) {
		return new Date(1970, 1, 1, date.hour(), date.minute(), date.second(), date.nano() / 1000000);
	}
	if (typeof date === 'number' || isLocalDateLike(date)) {
		return toDate(toLocalDate(date));
	}
	if (typeof date === 'string') {
		return new Date(date);
	}
	throw new Error('Cannot convert value to Date');
}

export function toLocalTime(time: any, zone: ZoneId = ZoneId.SYSTEM): LocalTime {
	if (time instanceof LocalTime) {
		return time;
	}
	if (time instanceof LocalDateTime) {
		return time.toLocalTime();
	}
	if (time instanceof ZonedDateTime) {
		return time.toLocalTime();
	}
	if (time instanceof Date) {
		return LocalTime.from(nativeJs(time, zone));
	}
	if (isLocalTimeLike(time)) {
		// eslint-disable-next-line no-underscore-dangle
		return LocalTime.of(time.hour, time.minute, time.second, time.nano);
	}
	if (typeof time === 'number') {
		return LocalTime.ofSecondOfDay(time);
	}
	if (typeof time === 'string') {
		if (iso8601TimeOnly.test(time)) {
			return LocalTime.parse(time);
		}
		return toLocalDateTime(time, zone).toLocalTime();
	}
	throw new Error('Cannot convert value to LocalTime');
}
