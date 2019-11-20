import moment, {Moment} from 'moment';
import {DateTimeFormatter, LocalDate, LocalDateTime, LocalTime, ZonedDateTime} from '@js-joda/core';
// @ts-ignore
import {Locale} from '@js-joda/locale_en-us';
import isInteger from 'lodash/isInteger';
import TransformEpochInt from './TransformEpochInt';
import TransformDate from './TransformDate';
import TransformMoment from './TransformMoment';

interface FormatDateParams {
	type: string;
	time: boolean;
	date: boolean;
	format?: string;
}

// export function isInteger(x: any): x is number {
// 	return isInteger(x);
// }

/**
 * Formats a date to a predefined style
 * @method formatDate
 * @param {Date|LocalDate|number|moment} obj - The Date, LocalDate, LocalTime, LocalDateTime, ZonedDateTime, integer (epoch days), or moment
 * @param params
 * @return {string} The formatted date/time
 */
export default function formatDate(
	obj: Date | LocalDate | number | Moment | string | LocalDateTime | LocalTime | ZonedDateTime | null | undefined,
	params: FormatDateParams = {type: 'short', time: false, date: true},
) {
	let l: LocalDate | LocalDateTime | LocalTime | ZonedDateTime | undefined;
	if (!obj) return '';
	if (isInteger(obj)) l = TransformEpochInt.toLocalDate(obj as number);
	if (obj instanceof Date) l = TransformDate.toLocalDate(obj);
	if (moment.isMoment(obj)) l = TransformMoment.toLocalDate(obj);
	if (obj instanceof LocalDate) l = obj;
	if (obj instanceof LocalDateTime) l = obj;
	if (obj instanceof LocalTime) l = obj;
	if (obj instanceof ZonedDateTime) l = obj;
	if (!l) throw new Error('Date could not be converted to a js-joda date');

	let dateFormat: string;
	let timeFormat: string;
	switch (params.type) {
		case 'medium':
			dateFormat = 'MMM d, yyyy';
			timeFormat = 'h:mm a';
			break;
		case 'long':
			dateFormat = 'MMMM d, yyyy';
			timeFormat = 'h:mm a';
			break;
		case 'short':
		default:
			dateFormat = 'M/d/yyyy';
			timeFormat = 'h:mm a';
			break;
	}

	if (l instanceof LocalDate) timeFormat = '';
	if (l instanceof LocalTime) dateFormat = '';

	let formatString = !params.date ? '' : dateFormat;
	if (params.time) {
		formatString = `${formatString} ${timeFormat}`;
	}

	const formatter = DateTimeFormatter.ofPattern(params.format || formatString).withLocale(Locale.ENGLISH);

	return l.format(formatter).replace(/AM|PM/, x => x.toLowerCase());
}
