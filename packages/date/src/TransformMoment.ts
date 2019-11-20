import {LocalDate, LocalDateTime, nativeJs} from '@js-joda/core';
import moment, {Moment} from 'moment';

export default class TransformMoment {
	/**
	 * Transforms a Moment to a LocalDate
	 * @param {moment.Moment} date
	 * @returns {LocalDate}
	 */
	static toLocalDate(date: Moment): LocalDate {
		return LocalDate.of(date.year(), date.month() + 1, date.date());
	}

	/**
	 * Transforms a Moment to a LocalDateTime
	 * @param {moment.Moment} date
	 * @returns {LocalDateTime}
	 */
	static toLocalDateTime(date: Moment): LocalDateTime {
		return LocalDateTime.from(nativeJs(date));
	}

	/**
	 * Transforms a moment or array of moments to JS Dates
	 * @param {moment|moment[]} date - Moment or array of Moments
	 * @return {Date|Date[]} A single date or array of dates
	 */
	static toDate(date: Moment): Date {
		if (moment.isMoment(date)) {
			if (date.isValid()) {
				return date.toDate();
			}
			throw new Error('Date is not a valid moment');
		}
		throw new Error('Date is not a moment');
	}

	static toDates(dates: Moment[]): Date[] {
		if (Array.isArray(dates)) {
			return dates.map(v => this.toDate(v));
		}
		throw new Error('Dates are not an array');
	}
}
