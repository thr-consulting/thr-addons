import momentLocalizer from 'react-widgets-moment';
import moment from 'moment';
import transform from 'lodash/transform';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isInteger from 'lodash/isInteger';
import map from 'lodash/map';
import isDate from 'lodash/isDate';
import isString from 'lodash/isString';
import {LocalDate} from 'js-joda';
import indexOf from 'lodash/indexOf';

/**
 * Initializes the date-time pickers
 */
export function dateInit() {
	momentLocalizer();
}

/**
 * Transforms a JS Date to a LocalDate
 * @param date
 * @returns {LocalDate}
 */
export function transformDateToLocalDate(date) {
	return LocalDate.of(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

/**
 * Transforms a LocalDate to a JS Date
 * @param localDate
 * @returns {Date}
 */
export function transformLocalDateToDate(localDate) {
	return new Date(localDate.year(), localDate.monthValue() - 1, localDate.dayOfMonth());
}

/**
 * Transforms a Moment to a LocalDate
 * @param obj
 * @returns {LocalDate}
 */
export function transformMomentToLocalDate(obj) {
	return LocalDate.of(obj.year(), obj.month() + 1, obj.date());
}

/**
 * Transforms a LocalDate to a Moment
 * @param localDate
 * @returns {*|moment.Moment}
 */
export function transformLocalDateToMoment(localDate) {
	return moment({
		year: localDate.year(),
		month: localDate.monthValue() - 1,
		day: localDate.dayOfMonth(),
	});
}

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
	if (isObject(obj)) {
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
	if (isObject(obj)) {
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
	if (isObject(obj)) {
		return transform(obj, (result, value, key) => {
			result[key] = transformLocalDatesToEpochInteger(value); // eslint-disable-line no-param-reassign
		}, {});
	}
	return obj;
}

/**
 * Transforms an epoch integer into a LocalDate
 * @param value
 * @returns {JSJoda.LocalDate}
 */
export function transformEpochIntegerToLocalDate(value) {
	return LocalDate.ofEpochDay(value);
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
	if (isObject(obj)) {
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
	if (isObject(obj)) {
		if (obj._year && obj._month && obj._day) return LocalDate.of(obj._year, obj._month, obj._day); // eslint-disable-line no-underscore-dangle
		return transform(obj, (result, value, key) => {
			result[key] = transformObjectsToLocalDates(value); // eslint-disable-line no-param-reassign
		}, {});
	}
	if (isString(obj) && localDateRegEx.test(obj)) return LocalDate.parse(obj);
	return obj;
}


/**
 * Formats a date to a predefined style
 * @method formatDate
 * @param {Date|moment|LocalDate} obj - The date or moment object or LocalDate object
 * @param {string} [type=short] options.type - short, medium, or long
 * @param {bool} [time=false] options.time - If true, displays the time
 * @param {bool} [date=true] options.date - If true, displays the date
 * @param {string} [format=null] options.format - If specified, overrides with a moment.format() string
 * @return {string} The formatted date/time
 */
export function formatDate(obj, {type: type = 'short', time: time = false, date: date = true, format} = {type: 'short'}) {
	let m = obj;
	if (m instanceof LocalDate) m = transformLocalDateToMoment(m);
	if (m instanceof Date) m = moment(m);
	if (!moment.isMoment(m)) throw new Error('formatDate requires a Date, LocalDate or Moment object to be passed as the first parameter.');
	let dateFormat;
	let timeFormat;
	switch (type || 'short') {
		case 'short':
			dateFormat = 'M/D/YYYY';
			timeFormat = 'h:mm a';
			break;
		case 'medium':
			dateFormat = 'MMM D, YYYY';
			timeFormat = 'h:mm a';
			break;
		case 'long':
			dateFormat = 'MMMM D, YYYY';
			timeFormat = 'h:mm a';
			break;
		default:
	}
	let formatString = (date === false) ? '' : dateFormat;
	if (time === true) {
		formatString = `${formatString} ${timeFormat}`;
	}
	return m.format(format || formatString);
}
