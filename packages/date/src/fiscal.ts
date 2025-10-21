import {LocalDate, type LocalDateTime, type LocalTime, Period, type ZonedDateTime} from '@js-joda/core';
import {type ILocalDateLike, toLocalDate} from './conversion';

type DateInput = ILocalDateLike | Date | LocalDate | number | string | LocalDateTime | LocalTime | ZonedDateTime | null | undefined;

export enum PeriodEnum {
	'Yearly' = 'yearly',
	'Quarterly' = 'quarterly',
}

export function PeriodEnumLookup(value: string) {
	switch (value) {
		case 'yearly':
			return PeriodEnum.Yearly;
		case 'quarterly':
			return PeriodEnum.Quarterly;
		default:
			throw new Error('Cannot find enum value: PeriodEnumLookup');
	}
}

export interface FiscalDateRange {
	startDate: LocalDate;
	endDate: LocalDate;
}

/**
 * Returns the @js-joda/Period from a PeriodEnum
 * @param period
 */
export function getFiscalPeriod(period: PeriodEnum): Period {
	switch (period) {
		case PeriodEnum.Yearly:
			return Period.of(1, 0, 0);
		case PeriodEnum.Quarterly:
			return Period.of(0, 3, 0);
		default:
			throw new Error(`Invalid period: ${period}`);
	}
}

/**
 * Utility to get the correct year-end date for a target year, handling Feb 29.
 */
export function safeYearEndForYear(yearEnd1: DateInput, targetYear: number): LocalDate {
	const yearEnd = toLocalDate(yearEnd1);
	const month = yearEnd.monthValue();
	const day = yearEnd.dayOfMonth();

	// If the year-end is Feb 29, return Feb 28 if target year is not a leap year.
	if (month === 2 && day === 29) {
		if (!LocalDate.of(targetYear, 1, 1).isLeapYear()) {
			return LocalDate.of(targetYear, 2, 28);
		}
	}
	return yearEnd.withYear(targetYear);
}

/**
 * Returns the fiscal year of a date.
 * The fiscal year is the year in which the fiscal period ends.
 * @param date
 * @param yearEnd
 */
export function getFiscalYear(date1: DateInput, yearEnd: DateInput): number {
	const date = toLocalDate(date1);
	const yearEndInDateYear = safeYearEndForYear(toLocalDate(yearEnd), date.year());

	// If the date is strictly after the year end in its own calendar year, it belongs to the next fiscal year.
	if (date.isAfter(yearEndInDateYear)) {
		return date.year() + 1;
	}

	// Otherwise, the fiscal year ends in the current calendar year.
	return date.year();
}

/**
 * Returns the start and end dates for the date's year of fiscal year.
 * @param date
 * @param yearEnd
 */
export function getFiscalYearRange(date: DateInput, yearEnd: DateInput): FiscalDateRange {
	const endYear = getFiscalYear(toLocalDate(date), toLocalDate(yearEnd));
	const startYear = endYear - 1;
	const yearEndInStartYear = safeYearEndForYear(yearEnd, startYear);
	const startDate = yearEndInStartYear.plusDays(1);
	const endDate = safeYearEndForYear(yearEnd, endYear);
	return {
		startDate,
		endDate,
	};
}

/**
 * Returns the quarter of a fiscal year for the date.
 * @param date
 * @param yearEnd
 */
export function getFiscalQuarter(dateInput: DateInput, yearEnd: DateInput): 1 | 2 | 3 | 4 {
	const date = toLocalDate(dateInput);
	const {startDate} = getFiscalYearRange(date, toLocalDate(yearEnd));

	// 3-month quarter checks:
	// Q1: date < start + 3 months
	if (date.isBefore(startDate.plusMonths(3))) return 1;
	// Q2: date < start + 6 months
	if (date.isBefore(startDate.plusMonths(6))) return 2;
	// Q3: date < start + 9 months
	if (date.isBefore(startDate.plusMonths(9))) return 3;
	// Q4: otherwise
	return 4;
}

/**
 * Returns the start and end dates of the date's fiscal quarter.
 * @param date
 * @param yearEnd
 */
export function getFiscalQuarterRange(date: DateInput, yearEnd: DateInput): FiscalDateRange {
	const {startDate} = getFiscalYearRange(toLocalDate(date), toLocalDate(yearEnd));
	const q = getFiscalQuarter(date, yearEnd);
	const quarterStart = startDate.plusMonths(3 * (q - 1));
	const quarterEnd = quarterStart.plusMonths(3).minusDays(1);

	return {
		startDate: quarterStart,
		endDate: quarterEnd,
	};
}

/**
 * Returns the start and end dates of the date's fiscal range depending on period.
 * @param period
 * @param date
 * @param yearEnd
 */
export function getFiscalRange(period: PeriodEnum, date1: DateInput, yearEnd1: DateInput): FiscalDateRange {
	const date = toLocalDate(date1);
	const yearEnd = toLocalDate(yearEnd1);
	if (period === PeriodEnum.Yearly) {
		return getFiscalYearRange(date, yearEnd);
	}

	return getFiscalQuarterRange(date, yearEnd);
}

/**
 * Shifts a given fiscal date range to a different target fiscal year.
 * @param baseRange
 * @param targetYear
 */
export function shiftFiscalRangeToYear(baseRange: FiscalDateRange, targetYear: number): FiscalDateRange {
	const offset = targetYear - baseRange.endDate.year();
	return {
		startDate: baseRange.startDate.plusYears(offset),
		endDate: baseRange.endDate.plusYears(offset),
	};
}
