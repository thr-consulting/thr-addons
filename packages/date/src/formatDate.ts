import {DateTimeFormatter, LocalDate, LocalDateTime, LocalTime, ZonedDateTime, ZoneId} from '@js-joda/core';
// @ts-ignore
import {Locale} from '@js-joda/locale_en-us';
import {toLocalDate, toLocalDateTime, ILocalDateLike, isLocalDateLike} from './conversion';

export enum FormatDateType {
	short = 'short',
	medium = 'medium',
	long = 'long',
}

export interface FormatDateParams {
	type?: FormatDateType | 'short' | 'medium' | 'long';
	time?: boolean;
	date?: boolean;
	format?: string;
}

/**
 * Formats a date to a string
 * @param obj
 * @param params
 * @param zone
 */
export function formatDate(
	obj: ILocalDateLike | Date | LocalDate | number | string | LocalDateTime | LocalTime | ZonedDateTime | null | undefined,
	{type = FormatDateType.short, time = false, date = true, format}: FormatDateParams = {type: FormatDateType.short, time: false, date: true},
	zone: ZoneId = ZoneId.SYSTEM,
) {
	let l: LocalDate | LocalDateTime | LocalTime | ZonedDateTime | undefined;
	if (!obj) return '';
	if (typeof obj === 'number') l = toLocalDate(obj);
	if (typeof obj === 'string' && time === false) l = toLocalDate(obj);
	if (typeof obj === 'string') l = toLocalDateTime(obj);
	if (isLocalDateLike(obj)) l = toLocalDate(obj);
	if (obj instanceof Date) l = toLocalDateTime(obj, zone);
	if (obj instanceof LocalDate) l = obj;
	if (obj instanceof LocalDateTime) l = obj;
	if (obj instanceof LocalTime) l = obj;
	if (obj instanceof ZonedDateTime) l = obj;
	if (!l) throw new Error('Date could not be converted to a js-joda date');

	let dateFormat: string;
	let timeFormat: string;
	switch (type) {
		case FormatDateType.medium:
			dateFormat = 'MMM d, yyyy';
			timeFormat = 'h:mm a';
			break;
		case FormatDateType.long:
			dateFormat = 'MMMM d, yyyy';
			timeFormat = 'h:mm a';
			break;
		case FormatDateType.short:
		default:
			dateFormat = 'M/d/yyyy';
			timeFormat = 'h:mm a';
			break;
	}

	if (l instanceof LocalDate) timeFormat = '';
	if (l instanceof LocalTime) dateFormat = '';

	let formatString = !date ? '' : dateFormat;
	if (time) {
		formatString = `${formatString} ${timeFormat}`.trim();
	}

	const formatter = DateTimeFormatter.ofPattern(format || formatString).withLocale(Locale.ENGLISH);

	return l.format(formatter).replace(/AM|PM/, x => x.toLowerCase());
}
