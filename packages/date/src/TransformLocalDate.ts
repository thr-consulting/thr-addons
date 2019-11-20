import {LocalDate} from '@js-joda/core';
import moment, {Moment} from 'moment';

interface ILocalDate {
	_year: number;
	_month: number;
	_day: number;
}

const localDateRegEx = /^\d\d\d\d-\d\d-\d\d$/;

export default class TransformLocalDate {
	/**
	 * Transforms a LocalDate to a JS Date
	 * @param {LocalDate} date
	 * @returns {Date}
	 */
	static toDate(date: LocalDate): Date {
		return new Date(date.year(), date.monthValue() - 1, date.dayOfMonth());
	}

	/**
	 * Transforms a LocalDate to a Moment
	 * @param date
	 * @returns {*|moment.Moment}
	 */
	static toMoment(date: LocalDate): Moment {
		return moment({
			year: date.year(),
			month: date.monthValue() - 1,
			day: date.dayOfMonth(),
		});
	}

	/**
	 * Transforms a LocalDate into an epoch integer
	 * @param date
	 * @returns {*}
	 */
	static toEpochInt(date: LocalDate): number {
		return date.toEpochDay();
	}

	static fromObject(obj: ILocalDate): LocalDate {
		// eslint-disable-next-line no-underscore-dangle
		return LocalDate.of(obj._year, obj._month, obj._day);
	}

	static fromString(str: string): LocalDate {
		if (localDateRegEx.test(str)) {
			return LocalDate.parse(str);
		}
		throw new Error('String is not in format YYYY-MM-DD');
	}
}
