import { LocalDate, Period } from '@js-joda/core';

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
 * Utility to get the correct year-end date for a target year, handling Feb 29.
 */
function safeYearEndForYear(yearEnd: LocalDate, targetYear: number): LocalDate {
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
export function getFiscalYear(date: LocalDate, yearEnd: LocalDate): number {
    const yearEndInDateYear = safeYearEndForYear(yearEnd, date.year());

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
export function getFiscalYearRange(date: LocalDate, yearEnd: LocalDate): FiscalDateRange {
    let endYear = getFiscalYear(date, yearEnd);
    let startYear = endYear - 1;
    const yearEndInStartYear = safeYearEndForYear(yearEnd, startYear);
    let startDate = yearEndInStartYear.plusDays(1);
    let endDate = safeYearEndForYear(yearEnd, endYear);
    if (yearEnd.monthValue() === 12 && yearEnd.dayOfMonth() === 31) {
        const currentYear = date.year();
        return {
            start: LocalDate.of(currentYear, 1, 1),
            end: LocalDate.of(currentYear, 12, 31),
        };
    }

    if (yearEnd.monthValue() === 2 && yearEnd.dayOfMonth() === 28 && date.isLeapYear() && date.monthValue() === 2 && date.dayOfMonth() === 29) {
        endYear = date.year();
        startYear = endYear - 1;
        startDate = safeYearEndForYear(yearEnd, startYear).plusDays(1);
        endDate = safeYearEndForYear(yearEnd, endYear);
    }

    // Force start to Mar 1 if YE is Feb 28 and start year is a leap year (to skip 2/29 start).
    if (yearEnd.monthValue() === 2 && yearEnd.dayOfMonth() === 28 && LocalDate.of(startYear, 1, 1).isLeapYear()) {
        startDate = LocalDate.of(startYear, 3, 1);
    }

    return {
        start: startDate,
        end: endDate,
    };
}

/**
 * Returns the quarter of a fiscal year for the date.
 * @param date
 * @param yearEnd
 */
export function getFiscalQuarter(date: LocalDate, yearEnd: LocalDate): 1 | 2 | 3 | 4 {
    const { start } = getFiscalYearRange(date, yearEnd);

    // 3-month quarter checks:
    // Q1: date < start + 3 months
    if (date.isBefore(start.plusMonths(3))) return 1;
    // Q2: date < start + 6 months
    if (date.isBefore(start.plusMonths(6))) return 2;
    // Q3: date < start + 9 months
    if (date.isBefore(start.plusMonths(9))) return 3;
    // Q4: otherwise
    return 4;
}

/**
 * Returns the start and end dates of the date's fiscal quarter.
 * @param date
 * @param yearEnd
 */
export function getFiscalQuarterRange(date: LocalDate, yearEnd: LocalDate): FiscalDateRange {
    const { start } = getFiscalYearRange(date, yearEnd);
    const q = getFiscalQuarter(date, yearEnd);
    const quarterStart = start.plusMonths(3 * (q - 1));
    const quarterEnd = quarterStart.plusMonths(3).minusDays(1);

    return {
        start: quarterStart,
        end: quarterEnd,
    };
}

/**
 * Returns the start and end dates of the date's fiscal range depending on period.
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
