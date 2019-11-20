import {LocalDate, LocalDateTime, nativeJs} from '@js-joda/core';
import moment, {Moment} from 'moment';

export default class TransformDate {
	/**
	 * Transforms a JS Date to a LocalDate
	 * @param date
	 * @returns {LocalDate}
	 */
	static toLocalDate(date: Date): LocalDate {
		return LocalDate.of(date.getFullYear(), date.getMonth() + 1, date.getDate());
	}

	/**
	 * Transforms a JS Date to a LocalDateTime
	 * @param {Date} date
	 * @returns {LocalDateTime}
	 */
	static toLocalDateTime(date: Date): LocalDateTime {
		return LocalDateTime.from(nativeJs(date));
	}

	/**
	 * Transforms a Date to an epoch integer
	 * @param value
	 * @returns {*}
	 */
	static toEpochInt(value: Date): number {
		return TransformDate.toLocalDate(value).toEpochDay();
	}

	static toMoment(date: Date): Moment {
		return moment(date);
	}

	static toMoments(dates: Date[]): Moment[] {
		if (Array.isArray(dates)) {
			return dates.map(v => this.toMoment(v));
		}
		throw new Error('Dates are not an array');
	}
}
