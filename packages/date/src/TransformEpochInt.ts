import {LocalDate} from '@js-joda/core';
import TransformLocalDate from './TransformLocalDate';

export default class TransformEpochInt {
	/**
	 * Transforms an epoch integer into a LocalDate
	 * @param date
	 * @returns {JSJoda.LocalDate}
	 */
	static toLocalDate(date: number): LocalDate {
		return LocalDate.ofEpochDay(date);
	}

	/**
	 * Transforms an epoch integer into a Date
	 * @param date
	 * @returns {Date}
	 */
	static toDate(date: number): Date {
		return TransformLocalDate.toDate(LocalDate.ofEpochDay(date));
	}
}
