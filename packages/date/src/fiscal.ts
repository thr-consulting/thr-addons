import {LocalDate, Period, TemporalAdjusters} from '@js-joda/core';

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
 * Returns the start and end dates for the date's year of fiscal year
 * @param date
 * @param yearEnd
 */
export function getFiscalYearRange(date: LocalDate, yearEnd: LocalDate): FiscalDateRange {
	const startMD = yearEnd.with(TemporalAdjusters.firstDayOfNextMonth());
	if (date.compareTo(yearEnd.withYear(date.year())) > 0) {
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

	return {
		start: startMD.withYear(date.year()),
		end: startMD.withYear(date.year()).minusDays(1),
	};
}

/**
 * Returns the quarter of a fiscal year for the date
 * @param date
 * @param yearEnd
 */
export function getFiscalQuarter(date: LocalDate, yearEnd: LocalDate): 1 | 2 | 3 | 4 {
	const month = date.monthValue(); // aug = 8
	const {start} = getFiscalYearRange(date, yearEnd);

	if (start.monthValue() === month) return 1;
	if (start.plusMonths(1).monthValue() === month) return 1;
	if (start.plusMonths(2).monthValue() === month) return 1;
	if (start.plusMonths(3).monthValue() === month) return 2;
	if (start.plusMonths(4).monthValue() === month) return 2;
	if (start.plusMonths(5).monthValue() === month) return 2;
	if (start.plusMonths(6).monthValue() === month) return 3;
	if (start.plusMonths(7).monthValue() === month) return 3;
	if (start.plusMonths(8).monthValue() === month) return 3;
	if (start.plusMonths(9).monthValue() === month) return 4;
	if (start.plusMonths(10).monthValue() === month) return 4;
	if (start.plusMonths(11).monthValue() === month) return 4;

	throw new Error('Invalid month');
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
