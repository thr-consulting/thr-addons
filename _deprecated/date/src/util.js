import moment from 'moment';
import debug from 'debug';
import transform from 'lodash/transform';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import isInteger from 'lodash/isInteger';
import map from 'lodash/map';
import isDate from 'lodash/isDate';
import isString from 'lodash/isString';
import indexOf from 'lodash/indexOf';
import 'js-joda-timezone';
import {Locale} from '@js-joda/locale_en-us';
import {LocalDate, LocalTime, LocalDateTime, ZonedDateTime, nativeJs, DateTimeFormatter} from 'js-joda';

const d = debug('thx.date.util');

/*
	Simple Transforms

								To
	From					Date    LocalDate   Moment    EpochInteger
	Date            -         x                     x
	LocalDate       x         -         x           x
	Moment                    x         -
	EpochInteger    x         x                     -
 */

/**
 * Transforms a JS Date to a LocalDate
 * @param date
 * @returns {LocalDate}
 */
export function transformDateToLocalDate(date) {
	if (!date) return null;
	return LocalDate.of(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

/**
 * Transforms a JS Date to a LocalDateTime
 * @param {Date} date
 * @returns {LocalDateTime}
 */
export function transformDateToLocalDateTime(date) {
	if (!date) return null;
	return LocalDateTime.from(nativeJs(date));
}

/**
 * Transforms a LocalDate to a JS Date
 * @param {LocalDate} localDate
 * @returns {Date}
 */
export function transformLocalDateToDate(localDate) {
	if (!localDate) return null;
	return new Date(localDate.year(), localDate.monthValue() - 1, localDate.dayOfMonth());
}

/**
 * Transforms a Moment to a LocalDate
 * @param {moment.Moment} obj
 * @returns {LocalDate}
 */
export function transformMomentToLocalDate(obj) {
	if (!obj) return null;
	return LocalDate.of(obj.year(), obj.month() + 1, obj.date());
}

/**
 * Transforms a Moment to a LocalDateTime
 * @param {moment.Moment} obj
 * @returns {LocalDateTime}
 */
export function transformMomentToLocalDateTime(obj) {
	if (!obj) return null;
	return LocalDateTime.from(nativeJs(obj));
}

/**
 * Transforms a LocalDate to a Moment
 * @param localDate
 * @returns {*|moment.Moment}
 */
export function transformLocalDateToMoment(localDate) {
	if (!localDate) return null;
	return moment({
		year: localDate.year(),
		month: localDate.monthValue() - 1,
		day: localDate.dayOfMonth(),
	});
}

/**
 * Transforms an epoch integer into a LocalDate
 * @param value
 * @returns {JSJoda.LocalDate}
 */
export function transformEpochIntegerToLocalDate(value) {
	if (!value) return null;
	return LocalDate.ofEpochDay(value);
}

/**
 * Transforms an epoch integer into a Date
 * @param value
 * @returns {Date}
 */
export function transformEpochIntegerToDate(value) {
	if (!value) return null;
	return transformLocalDateToDate(LocalDate.ofEpochDay(value));
}

/**
 * Transforms a LocalDate into an epoch integer
 * @param value
 * @returns {*}
 */
export function transformLocalDateToEpochInteger(value) {
	if (!value) return null;
	return value.toEpochDay();
}

/**
 * Transforms a Date to an epoch integer
 * @param value
 * @returns {*}
 */
export function transformDateToEpochInteger(value) {
	if (!value) return null;
	return transformDateToLocalDate(value).toEpochDay();
}

/* == Array or Anything Transforms == */

/**
 * Transforms a moment or array of moments to JS Dates
 * @param {moment|moment[]} obj - Moment or array of Moments
 * @return {Date|Date[]} A single date or array of dates
 */
export function transformMomentsToDate(obj) {
	if (moment.isMoment(obj)) {
		return obj.isValid() ? obj.toDate() : null;
	}
	if (isArray(obj)) {
		return map(obj, v => transformMomentsToDate(v));
	}
	if (isPlainObject(obj)) {
		return transform(obj, (result, value, key) => {
			result[key] = transformMomentsToDate(value); // eslint-disable-line no-param-reassign
		}, {});
	}
	return obj;
}

/**
 * Transforms a date or array of dates to moments
 * @param {date|date[]} obj - Date or array of Dates
 * @return {moment|moment[]} A single moment or array of moments
 */
export function transformDatesToMoment(obj) {
	if (isDate(obj)) return moment(obj);
	if (isArray(obj)) {
		return map(obj, v => transformDatesToMoment(v));
	}
	if (isPlainObject(obj)) {
		return transform(obj, (result, value, key) => {
			result[key] = transformDatesToMoment(value); // eslint-disable-line no-param-reassign
		}, {});
	}
	return obj;
}

/**
 * Transforms anything that is a LocalDate into epoch integer's. Iterates over arrays and object keys.
 * @param obj
 * @returns {*}
 */
export function transformLocalDatesToEpochInteger(obj) {
	if (obj instanceof LocalDate) return obj.toEpochDay();
	if (isArray(obj)) {
		return map(obj, v => transformLocalDatesToEpochInteger(v));
	}
	if (isPlainObject(obj)) {
		return transform(obj, (result, value, key) => {
			result[key] = transformLocalDatesToEpochInteger(value); // eslint-disable-line no-param-reassign
		}, {});
	}
	return obj;
}

/**
 * Transforms anything that has epoch integers into LocalDates. You need to specify which path's are EpochIntegers in paths.
 * @param obj
 * @param paths
 * @returns {*}
 */
export function mapEpochIntegerToLocalDates(obj, paths, curPath = []) {
	if (isInteger(obj)) {
		if (indexOf(paths, curPath.join('.')) >= 0) {
			return transformEpochIntegerToLocalDate(obj);
		}
		return obj;
	}
	if (isArray(obj)) {
		return map(obj, v => mapEpochIntegerToLocalDates(v, paths, [...curPath]));
	}
	if (isPlainObject(obj)) {
		return transform(obj, (result, value, key) => {
			result[key] = mapEpochIntegerToLocalDates(value, paths, [...curPath, key]); // eslint-disable-line no-param-reassign
		}, {});
	}
	return obj;
}

const localDateRegEx = /^\d\d\d\d-\d\d-\d\d$/;
/**
 * Transforms anything that has LocalDate style objects into LocalDates.
 * @param obj
 * @returns {*}
 */
export function transformObjectsToLocalDates(obj) {
	if (isArray(obj)) {
		return map(obj, v => transformObjectsToLocalDates(v));
	}
	if (isPlainObject(obj)) {
		if (obj._year && obj._month && obj._day) return LocalDate.of(obj._year, obj._month, obj._day); // eslint-disable-line no-underscore-dangle
		return transform(obj, (result, value, key) => {
			result[key] = transformObjectsToLocalDates(value); // eslint-disable-line no-param-reassign
		}, {});
	}
	if (isString(obj) && localDateRegEx.test(obj)) return LocalDate.parse(obj);
	if (isDate(obj)) {
		return LocalDate.from(nativeJs(obj));
	}
	return obj;
}

/**
 * Formats a date to a predefined style
 * @method formatDate
 * @param {Date|LocalDate|number|moment} obj - The Date, LocalDate, LocalTime, LocalDateTime, ZonedDateTime, integer (epoch days), or moment
 * @param {string} [type=short] options.type - short, medium, or long
 * @param {bool} [time=false] options.time - If true, displays the time
 * @param {bool} [date=true] options.date - If true, displays the date
 * @param {string} [format=null] options.format - If specified, overrides with a moment.format() string
 * @return {string} The formatted date/time
 */
export function formatDate(obj, {type: type = 'short', time: time = false, date: date = true, format} = {type: 'short'}) {
	if (!obj) return '';
	let m = obj;
	if (isInteger(m)) m = transformEpochIntegerToLocalDate(m);
	if (m instanceof Date) m = transformDateToLocalDateTime(m);
	if (moment.isMoment(m)) m = transformMomentToLocalDateTime(m);
	if (
		!((m instanceof LocalDate)
		|| (m instanceof LocalTime)
		|| (m instanceof LocalDateTime)
		|| (m instanceof ZonedDateTime))
	) {
		throw new Error('formatDate requires a Date, LocalDate, LocalTime, LocalDateTime, ZonedDateTime, integer (epoch days) or Moment to be passed as the first parameter.');
	}

	let dateFormat;
	let timeFormat;
	switch (type || 'short') {
		case 'short':
			dateFormat = 'M/d/yyyy';
			timeFormat = 'h:mm a';
			break;
		case 'medium':
			dateFormat = 'MMM d, yyyy';
			timeFormat = 'h:mm a';
			break;
		case 'long':
			dateFormat = 'MMMM d, yyyy';
			timeFormat = 'h:mm a';
			break;
		default:
	}

	if (m instanceof LocalDate) timeFormat = '';
	if (m instanceof LocalTime) dateFormat = '';

	let formatString = (date === false) ? '' : dateFormat;
	if (time === true) {
		formatString = `${formatString} ${timeFormat}`;
	}

	const formatter = DateTimeFormatter.ofPattern(format || formatString).withLocale(Locale.ENGLISH);

	return m.format(formatter).replace(/AM|PM/, x => x.toLowerCase());
}
