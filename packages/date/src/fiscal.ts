import {type LocalDate, Period} from '@js-joda/core';

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
	start: LocalDate;
	end: LocalDate;
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
 * Returns the fiscal year of a date
 * @param date
 * @param yearEnd
 */
export function getFiscalYear(date: LocalDate, yearEnd: LocalDate): number {
	return date.isAfter(yearEnd.withYear(date.year())) ? date.year() + 1 : date.year();
}

/**
 * Returns the start and end dates for the date's year of fiscal year
 * @param date
 * @param yearEnd
 */
export function getFiscalYearRange(date: LocalDate, yearEnd: LocalDate): FiscalDateRange {
	const startMD = yearEnd.plusDays(1);

	if (date.compareTo(yearEnd.withYear(date.year())) > 0) {
		// console.log(`Cur date: ${date.toString()} is after ye MD of ${yearEnd.toString()}`);
		return {
			start: startMD.withYear(date.year()),
			end: startMD.withYear(date.year()).plusYears(1).minusDays(1),
		};
	}

	if (startMD.monthValue() === 1) {
		return {
			start: startMD.withYear(date.year()),
			end: startMD.withYear(date.year() + 1).minusDays(1),
		};
	}

	// console.log(`Cur date: ${date.toString()} is before ye MD of ${yearEnd.toString()}`);
	return {
		start: startMD.withYear(date.year() - 1),
		end: startMD.withYear(date.year()).minusDays(1),
	};
}

/**
 * Returns the quarter of a fiscal year for the date
 * @param date
 * @param yearEnd
 */
export function getFiscalQuarter(date: LocalDate, yearEnd: LocalDate): 1 | 2 | 3 | 4 {
	// const day = date.dayOfMonth();
	// const month = date.monthValue(); // aug = 8
	const {start, end} = getFiscalYearRange(date, yearEnd);

	if (date.isBefore(start.plusMonths(3))) return 1;
	if (date.isBefore(start.plusMonths(6))) return 2;
	if (date.isBefore(start.plusMonths(9))) return 3;
	return 4;
}

/**
 * Returns the start and end dates of the date's fiscal quarter
 * @param date
 * @param yearEnd
 */
export function getFiscalQuarterRange(date: LocalDate, yearEnd: LocalDate): FiscalDateRange {
	const {start} = getFiscalYearRange(date, yearEnd);
	const q = getFiscalQuarter(date, yearEnd);
	const fp = getFiscalPeriod(PeriodEnum.Quarterly);

	return {
		start: start.plus(fp.multipliedBy(q - 1)),
		end: start.plus(fp.multipliedBy(q)).minusDays(1),
	};
}

/**
 * Returns the start and end dates of the date's fiscal range depending on period
 * @param period
 * @param date
 * @param yearEnd
 */
export function getFiscalRange(period: PeriodEnum, date: LocalDate, yearEnd: LocalDate): FiscalDateRange {
	if (period === PeriodEnum.Yearly) {
		return getFiscalYearRange(date, yearEnd);
	}

	return getFiscalQuarterRange(date, yearEnd);
}
