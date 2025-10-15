import {LocalDate, Period} from '@js-joda/core';
import {expect} from 'chai';
import {
	getFiscalYear,
	getFiscalPeriod,
	getFiscalYearRange,
	PeriodEnum,
	PeriodEnumLookup,
	getFiscalQuarter,
	getFiscalQuarterRange,
	getFiscalRange,
} from '../fiscal';

const dates = {
	jan_01_2020: LocalDate.of(2020, 1, 1),
	feb_28_2020: LocalDate.of(2020, 2, 28),
	jun_30_2020: LocalDate.of(2020, 6, 30),
	dec_31_2020: LocalDate.of(2020, 12, 31),
	jan_01_2024: LocalDate.of(2024, 1, 1),
	jan_02_2024: LocalDate.of(2024, 1, 2),
	feb_29_2024: LocalDate.of(2024, 2, 29),
	mar_01_2024: LocalDate.of(2024, 3, 1),
	jun_30_2024: LocalDate.of(2024, 6, 30),
	jul_01_2024: LocalDate.of(2024, 7, 1),
	sep_30_2024: LocalDate.of(2024, 9, 30),
	oct_01_2024: LocalDate.of(2024, 10, 1),
	dec_31_2024: LocalDate.of(2024, 12, 31),
	jan_01_2025: LocalDate.of(2025, 1, 1),
	feb_28_2025: LocalDate.of(2025, 2, 28),
	mar_01_2025: LocalDate.of(2025, 3, 1),
	mar_31_2025: LocalDate.of(2025, 3, 31),
	apr_01_2025: LocalDate.of(2025, 4, 1),
	jun_30_2025: LocalDate.of(2025, 6, 30),
	jul_01_2025: LocalDate.of(2025, 7, 1),
	oct_01_2025: LocalDate.of(2025, 10, 1),
};

describe('Fiscal Functions', () => {
	it('should return the Period Enum', () => {
		expect(PeriodEnumLookup('yearly')).to.equal(PeriodEnum.Yearly);
		expect(PeriodEnumLookup('quarterly')).to.equal(PeriodEnum.Quarterly);
	});

	it('should return the fiscal period', () => {
		expect(getFiscalPeriod(PeriodEnum.Yearly).equals(Period.of(1, 0, 0))).to.be.true;
		expect(getFiscalPeriod(PeriodEnum.Quarterly).equals(Period.of(0, 3, 0))).to.be.true;
	});

	const a = LocalDate.of(2022, 1, 1);
	const b = LocalDate.of(2022, 4, 12);
	const c = LocalDate.of(2022, 6, 30);
	const d = LocalDate.of(2022, 7, 1);
	const e = LocalDate.of(2022, 9, 12);
	const f = LocalDate.of(2022, 12, 31);

	it('should return the fiscal year range, ye = 1/1/2020', () => {
		const ye = LocalDate.of(2020, 1, 31);
		expect(getFiscalYearRange(a, ye).start.equals(LocalDate.of(2021, 2, 1))).to.be.true;
		expect(getFiscalYearRange(a, ye).end.equals(LocalDate.of(2022, 1, 31))).to.be.true;
		expect(getFiscalYearRange(b, ye).start.equals(LocalDate.of(2022, 2, 1))).to.be.true;
		expect(getFiscalYearRange(b, ye).end.equals(LocalDate.of(2023, 1, 31))).to.be.true;
		expect(getFiscalYearRange(c, ye).start.equals(LocalDate.of(2022, 2, 1))).to.be.true;
		expect(getFiscalYearRange(c, ye).end.equals(LocalDate.of(2023, 1, 31))).to.be.true;
		expect(getFiscalYearRange(d, ye).start.equals(LocalDate.of(2022, 2, 1))).to.be.true;
		expect(getFiscalYearRange(d, ye).end.equals(LocalDate.of(2023, 1, 31))).to.be.true;
		expect(getFiscalYearRange(e, ye).start.equals(LocalDate.of(2022, 2, 1))).to.be.true;
		expect(getFiscalYearRange(e, ye).end.equals(LocalDate.of(2023, 1, 31))).to.be.true;
		expect(getFiscalYearRange(f, ye).start.equals(LocalDate.of(2022, 2, 1))).to.be.true;
		expect(getFiscalYearRange(f, ye).end.equals(LocalDate.of(2023, 1, 31))).to.be.true;
	});

	it('should return the fiscal year range, ye = 6/30/2020', () => {
		const ye = LocalDate.of(2020, 6, 30);
		expect(getFiscalYearRange(a, ye).start.equals(LocalDate.of(2021, 7, 1))).to.be.true;
		expect(getFiscalYearRange(a, ye).end.equals(LocalDate.of(2022, 6, 30))).to.be.true;
		expect(getFiscalYearRange(b, ye).start.equals(LocalDate.of(2021, 7, 1))).to.be.true;
		expect(getFiscalYearRange(b, ye).end.equals(LocalDate.of(2022, 6, 30))).to.be.true;
		expect(getFiscalYearRange(c, ye).start.equals(LocalDate.of(2021, 7, 1))).to.be.true;
		expect(getFiscalYearRange(c, ye).end.equals(LocalDate.of(2022, 6, 30))).to.be.true;
		expect(getFiscalYearRange(d, ye).start.equals(LocalDate.of(2022, 7, 1))).to.be.true;
		expect(getFiscalYearRange(d, ye).end.equals(LocalDate.of(2023, 6, 30))).to.be.true;
		expect(getFiscalYearRange(e, ye).start.equals(LocalDate.of(2022, 7, 1))).to.be.true;
		expect(getFiscalYearRange(e, ye).end.equals(LocalDate.of(2023, 6, 30))).to.be.true;
		expect(getFiscalYearRange(f, ye).start.equals(LocalDate.of(2022, 7, 1))).to.be.true;
		expect(getFiscalYearRange(f, ye).end.equals(LocalDate.of(2023, 6, 30))).to.be.true;
	});

	it('should return the fiscal year range, ye = 12/31/2020', () => {
		const ye = LocalDate.of(2020, 12, 31);
		expect(getFiscalYearRange(a, ye).start.equals(LocalDate.of(2022, 1, 1))).to.be.true;
		expect(getFiscalYearRange(a, ye).end.equals(LocalDate.of(2022, 12, 31))).to.be.true;
		expect(getFiscalYearRange(b, ye).start.equals(LocalDate.of(2022, 1, 1))).to.be.true;
		expect(getFiscalYearRange(b, ye).end.equals(LocalDate.of(2022, 12, 31))).to.be.true;
		expect(getFiscalYearRange(c, ye).start.equals(LocalDate.of(2022, 1, 1))).to.be.true;
		expect(getFiscalYearRange(c, ye).end.equals(LocalDate.of(2022, 12, 31))).to.be.true;
		expect(getFiscalYearRange(d, ye).start.equals(LocalDate.of(2022, 1, 1))).to.be.true;
		expect(getFiscalYearRange(d, ye).end.equals(LocalDate.of(2022, 12, 31))).to.be.true;
		expect(getFiscalYearRange(e, ye).start.equals(LocalDate.of(2022, 1, 1))).to.be.true;
		expect(getFiscalYearRange(e, ye).end.equals(LocalDate.of(2022, 12, 31))).to.be.true;
		expect(getFiscalYearRange(f, ye).start.equals(LocalDate.of(2022, 1, 1))).to.be.true;
		expect(getFiscalYearRange(f, ye).end.equals(LocalDate.of(2022, 12, 31))).to.be.true;
	});

	it('should return the fiscal year range, ye = 6/21/2020', () => {
		const ye = LocalDate.of(2020, 6, 21);
		expect(getFiscalYearRange(a, ye).start.equals(LocalDate.of(2021, 6, 22))).to.be.true;
		expect(getFiscalYearRange(a, ye).end.equals(LocalDate.of(2022, 6, 21))).to.be.true;
		expect(getFiscalYearRange(b, ye).start.equals(LocalDate.of(2021, 6, 22))).to.be.true;
		expect(getFiscalYearRange(b, ye).end.equals(LocalDate.of(2022, 6, 21))).to.be.true;
		expect(getFiscalYearRange(c, ye).start.equals(LocalDate.of(2022, 6, 22))).to.be.true;
		expect(getFiscalYearRange(c, ye).end.equals(LocalDate.of(2023, 6, 21))).to.be.true;
		expect(getFiscalYearRange(d, ye).start.equals(LocalDate.of(2022, 6, 22))).to.be.true;
		expect(getFiscalYearRange(d, ye).end.equals(LocalDate.of(2023, 6, 21))).to.be.true;
		expect(getFiscalYearRange(e, ye).start.equals(LocalDate.of(2022, 6, 22))).to.be.true;
		expect(getFiscalYearRange(e, ye).end.equals(LocalDate.of(2023, 6, 21))).to.be.true;
		expect(getFiscalYearRange(f, ye).start.equals(LocalDate.of(2022, 6, 22))).to.be.true;
		expect(getFiscalYearRange(f, ye).end.equals(LocalDate.of(2023, 6, 21))).to.be.true;
	});

	it('should return the correct quarter, ye = 1/1/2020', () => {
		const ye = LocalDate.of(2020, 1, 31);
		expect(getFiscalQuarter(a, ye)).to.equal(4);
		expect(getFiscalQuarter(b, ye)).to.equal(1);
		expect(getFiscalQuarter(c, ye)).to.equal(2);
		expect(getFiscalQuarter(d, ye)).to.equal(2);
		expect(getFiscalQuarter(e, ye)).to.equal(3);
		expect(getFiscalQuarter(f, ye)).to.equal(4);
	});

	it('should return the correct quarter, ye = 6/30/2020', () => {
		const ye = LocalDate.of(2020, 6, 30);
		expect(getFiscalQuarter(a, ye)).to.equal(3);
		expect(getFiscalQuarter(b, ye)).to.equal(4);
		expect(getFiscalQuarter(c, ye)).to.equal(4);
		expect(getFiscalQuarter(d, ye)).to.equal(1);
		expect(getFiscalQuarter(e, ye)).to.equal(1);
		expect(getFiscalQuarter(f, ye)).to.equal(2);
	});

	it('should return the correct quarter, ye = 12/31/2020', () => {
		const ye = LocalDate.of(2020, 12, 31);
		expect(getFiscalQuarter(a, ye)).to.equal(1);
		expect(getFiscalQuarter(b, ye)).to.equal(2);
		expect(getFiscalQuarter(c, ye)).to.equal(2);
		expect(getFiscalQuarter(d, ye)).to.equal(3);
		expect(getFiscalQuarter(e, ye)).to.equal(3);
		expect(getFiscalQuarter(f, ye)).to.equal(4);
	});

	it('should return the correct quarter, ye = 6/21/2020', () => {
		const ye = LocalDate.of(2020, 6, 21);
		expect(getFiscalQuarter(a, ye)).to.equal(3);
		expect(getFiscalQuarter(b, ye)).to.equal(4);
		expect(getFiscalQuarter(c, ye)).to.equal(1);
		expect(getFiscalQuarter(d, ye)).to.equal(1);
		expect(getFiscalQuarter(e, ye)).to.equal(1);
		expect(getFiscalQuarter(f, ye)).to.equal(3);
	});

	it('should return the correct fiscal year based on the date and year end', () => {
		const yearEnd = LocalDate.of(2020, 12, 31);
		expect(getFiscalYear(LocalDate.of(2020, 1, 1), yearEnd)).to.equal(2020);
		expect(getFiscalYear(LocalDate.of(2020, 12, 31), yearEnd)).to.equal(2020);
		expect(getFiscalYear(LocalDate.of(2021, 1, 1), yearEnd)).to.equal(2021);
		expect(getFiscalYear(LocalDate.of(2021, 12, 31), yearEnd)).to.equal(2021);
		expect(getFiscalYear(LocalDate.of(2020, 12, 31), yearEnd)).to.equal(2020);
	});

	it('should return the correct PeriodEnum for valid strings', () => {
		expect(PeriodEnumLookup('yearly')).to.equal(PeriodEnum.Yearly);
		expect(PeriodEnumLookup('quarterly')).to.equal(PeriodEnum.Quarterly);
	});

	it('should throw an error for invalid string input', () => {
		expect(() => PeriodEnumLookup('monthly')).to.throw('Cannot find enum value: PeriodEnumLookup');
		expect(() => PeriodEnumLookup('Yearly')).to.throw('Cannot find enum value: PeriodEnumLookup');
		expect(() => PeriodEnumLookup('')).to.throw('Cannot find enum value: PeriodEnumLookup');
	});

	it('should return the correct Period object', () => {
		expect(getFiscalPeriod(PeriodEnum.Yearly).equals(Period.of(1, 0, 0))).to.be.true;
		expect(getFiscalPeriod(PeriodEnum.Quarterly).equals(Period.of(0, 3, 0))).to.be.true;
	});

	it('should throw an error for an invalid PeriodEnum value', () => {
		expect(() => getFiscalPeriod('invalid' as PeriodEnum)).to.throw('Invalid period: invalid');
		expect(() => getFiscalPeriod('99' as PeriodEnum)).to.throw('Invalid period: 99');
	});

	it('should return the correct fiscal year for calendar year dates', () => {
		expect(getFiscalYear(dates.jan_01_2024, dates.dec_31_2020)).to.equal(2024);
		expect(getFiscalYear(dates.dec_31_2024, dates.dec_31_2020)).to.equal(2024);
		expect(getFiscalYear(dates.jan_01_2025, dates.dec_31_2020)).to.equal(2025);
	});

	it('should return the correct fiscal year for date just before year-end (July 1 FY)', () => {
		expect(getFiscalYear(dates.jun_30_2024, dates.jun_30_2020)).to.equal(2024);
	});

	it('should return the correct fiscal year for date on/after year-end (July 1 FY)', () => {
		expect(getFiscalYear(dates.jul_01_2024, dates.jun_30_2020)).to.equal(2025);
		expect(getFiscalYear(dates.dec_31_2024, dates.jun_30_2020)).to.equal(2025);
	});

	it('should return the correct fiscal year for boundary dates', () => {
		// YE 6/30
		expect(getFiscalYear(dates.jun_30_2024, dates.jun_30_2020)).to.equal(2024);
		expect(getFiscalYear(dates.jul_01_2024, dates.jun_30_2020)).to.equal(2025);
		// YE 1/1
		expect(getFiscalYear(dates.jan_01_2024, dates.jan_01_2020)).to.equal(2024);
		expect(getFiscalYear(dates.jan_02_2024, dates.jan_01_2020)).to.equal(2025);
		// YE 2/28
		expect(getFiscalYear(dates.feb_29_2024, dates.feb_28_2020)).to.equal(2025);
		expect(getFiscalYear(dates.feb_28_2025, dates.feb_28_2020)).to.equal(2025);
	});

	it('should handle leap year dates (Feb 29) correctly', () => {
		expect(getFiscalYear(dates.feb_29_2024, dates.feb_28_2020)).to.equal(2025);
		expect(getFiscalYear(dates.mar_01_2024, dates.feb_28_2020)).to.equal(2025);
	});

	const leapYE = LocalDate.of(2020, 2, 29);
	it('should handle Feb 29 as a year-end date correctly', () => {
		expect(getFiscalYear(dates.feb_29_2024, leapYE)).to.equal(2024);
		expect(getFiscalYear(dates.mar_01_2024, leapYE)).to.equal(2025);
	});

	it('should handle getFiscalYearRange for YE 2/28 with non-leap start year', () => {
		expect(getFiscalYearRange(dates.jan_01_2024, dates.feb_28_2020)).to.deep.equal({
			start: LocalDate.of(2023, 3, 1),
			end: LocalDate.of(2024, 2, 28),
		});
	});

	it('should handle getFiscalYearRange for YE 2/28 with leap start year (forces Mar 1 start)', () => {
		expect(getFiscalYearRange(dates.mar_01_2024, dates.feb_28_2020)).to.deep.equal({
			start: LocalDate.of(2024, 2, 29),
			end: LocalDate.of(2025, 2, 28),
		});
	});

	it('should return a calendar year range (YE 12/31)', () => {
		expect(getFiscalYearRange(dates.jan_01_2024, dates.dec_31_2020)).to.deep.equal({
			start: LocalDate.of(2024, 1, 1),
			end: LocalDate.of(2024, 12, 31),
		});
		expect(getFiscalYearRange(dates.dec_31_2024, dates.dec_31_2020)).to.deep.equal({
			start: LocalDate.of(2024, 1, 1),
			end: LocalDate.of(2024, 12, 31),
		});
	});

	it('should return the correct range for date on fiscal year start (YE 6/30)', () => {
		expect(getFiscalYearRange(dates.jul_01_2024, dates.jun_30_2020)).to.deep.equal({
			start: LocalDate.of(2024, 7, 1),
			end: LocalDate.of(2025, 6, 30),
		});
	});
	it('should return the correct range for date on fiscal year end (YE 6/30)', () => {
		expect(getFiscalYearRange(dates.jun_30_2025, dates.jun_30_2020)).to.deep.equal({
			start: LocalDate.of(2024, 7, 1),
			end: LocalDate.of(2025, 6, 30),
		});
	});
	it('should return the correct range for date before year-end month/day (YE 6/30)', () => {
		expect(getFiscalYearRange(dates.mar_01_2025, dates.jun_30_2020)).to.deep.equal({
			start: LocalDate.of(2024, 7, 1),
			end: LocalDate.of(2025, 6, 30),
		});
	});

	it('should return the correct range for YE 1/1 (start 1/2)', () => {
		expect(getFiscalYearRange(dates.jan_01_2024, dates.jan_01_2020)).to.deep.equal({
			start: LocalDate.of(2023, 1, 2),
			end: LocalDate.of(2024, 1, 1),
		});

		expect(getFiscalYearRange(dates.jan_01_2025.plusDays(1), dates.jan_01_2020)).to.deep.equal({
			start: LocalDate.of(2025, 1, 2),
			end: LocalDate.of(2026, 1, 1),
		});
	});

	const feb29YE = LocalDate.of(2020, 2, 29);
	it('should end on Feb 28th when the nominal Feb 29th YE falls in a non-leap year', () => {
		const dateInNonLeapFY = LocalDate.of(2025, 6, 15);
		expect(getFiscalYearRange(dateInNonLeapFY, feb29YE)).to.deep.equal({
			start: LocalDate.of(2025, 3, 1),
			end: LocalDate.of(2026, 2, 28),
		});
	});

	it('should end on Feb 29th when the nominal Feb 29th YE falls in a leap year', () => {
		const dateInLeapFY = LocalDate.of(2023, 6, 15);
		expect(getFiscalYearRange(dateInLeapFY, feb29YE)).to.deep.equal({
			start: LocalDate.of(2023, 3, 1),
			end: LocalDate.of(2024, 2, 29),
		});
	});

	const ye = LocalDate.of(2020, 6, 21);
	const onStartDay = LocalDate.of(2022, 6, 22);
	it('should return the correct range for date right on fiscal year start (YE 6/21)', () => {
		expect(getFiscalYearRange(onStartDay, ye)).to.deep.equal({
			start: LocalDate.of(2022, 6, 22),
			end: LocalDate.of(2023, 6, 21),
		});
	});
	const onEndDay = LocalDate.of(2022, 6, 21);
	it('should return the correct range for date right on fiscal year end (YE 6/21)', () => {
		expect(getFiscalYearRange(onEndDay, ye)).to.deep.equal({
			start: LocalDate.of(2021, 6, 22),
			end: LocalDate.of(2022, 6, 21),
		});
	});

	it('should return Quarter 1 (July 1 - Sep 30)', () => {
		expect(getFiscalQuarter(dates.jul_01_2024, dates.jun_30_2020)).to.equal(1);
		expect(getFiscalQuarter(LocalDate.of(2024, 9, 30), dates.jun_30_2020)).to.equal(1);
	});

	it('should return Quarter 2 (Oct 1 - Dec 31)', () => {
		expect(getFiscalQuarter(dates.oct_01_2025, dates.jun_30_2020)).to.equal(2);
		expect(getFiscalQuarter(dates.dec_31_2024, dates.jun_30_2020)).to.equal(2);
	});

	it('should return Quarter 3 (Jan 1 - Mar 31)', () => {
		expect(getFiscalQuarter(dates.jan_01_2025, dates.jun_30_2020)).to.equal(3);
		expect(getFiscalQuarter(dates.mar_31_2025, dates.jun_30_2020)).to.equal(3);
	});

	it('should return Quarter 4 (Apr 1 - Jun 30)', () => {
		expect(getFiscalQuarter(dates.apr_01_2025, dates.jun_30_2020)).to.equal(4);
		expect(getFiscalQuarter(dates.jun_30_2025, dates.jun_30_2020)).to.equal(4);
	});

	it('should return correct quarters for a calendar fiscal year (YE 12/31)', () => {
		expect(getFiscalQuarter(dates.jan_01_2025, dates.dec_31_2020)).to.equal(1);
		expect(getFiscalQuarter(dates.mar_31_2025, dates.dec_31_2020)).to.equal(1);
		expect(getFiscalQuarter(dates.apr_01_2025, dates.dec_31_2020)).to.equal(2);
		expect(getFiscalQuarter(dates.jul_01_2025, dates.dec_31_2020)).to.equal(3);
		expect(getFiscalQuarter(dates.dec_31_2024, dates.dec_31_2020)).to.equal(4);
	});

	it('should return the correct quarter on boundary dates (YE 6/30)', () => {
		expect(getFiscalQuarter(dates.sep_30_2024, dates.jun_30_2024)).to.equal(1);
		expect(getFiscalQuarter(dates.oct_01_2024, dates.jun_30_2024)).to.equal(2);
		expect(getFiscalQuarter(dates.dec_31_2024, dates.jun_30_2024)).to.equal(2);
		expect(getFiscalQuarter(dates.jan_01_2025, dates.jun_30_2024)).to.equal(3);
		expect(getFiscalQuarter(dates.mar_31_2025, dates.jun_30_2024)).to.equal(3);
		expect(getFiscalQuarter(dates.apr_01_2025, dates.jun_30_2024)).to.equal(4);
		expect(getFiscalQuarter(dates.jun_30_2025, dates.jun_30_2024)).to.equal(4);
	});

	it('should return the correct range for Q1 start date (Jul 1)', () => {
		expect(getFiscalQuarterRange(dates.jul_01_2024, dates.jun_30_2020)).to.deep.equal({
			start: dates.jul_01_2024,
			end: dates.jul_01_2024.plusMonths(3).minusDays(1),
		});
	});

	it('should return the correct range for Q2 start date (Oct 1)', () => {
		expect(getFiscalQuarterRange(dates.oct_01_2025, dates.jun_30_2020)).to.deep.equal({
			start: LocalDate.of(2025, 10, 1),
			end: LocalDate.of(2025, 12, 31),
		});
	});

	const dateQ4End = LocalDate.of(2025, 6, 30);
	it('should return the correct range for Q4 end date (Jun 30)', () => {
		const range = getFiscalQuarterRange(dateQ4End, dates.jun_30_2020);
		expect(range.start.equals(LocalDate.of(2025, 4, 1))).to.be.true;
		expect(range.end.equals(LocalDate.of(2025, 6, 30))).to.be.true;
	});

	it('should return the correct range for Q1 end date (Sep 30)', () => {
		const dateQ1End = LocalDate.of(2024, 9, 30);
		const range = getFiscalQuarterRange(dateQ1End, dates.jun_30_2020);
		expect(range.start.equals(dates.jul_01_2024)).to.be.true;
		expect(range.end.equals(LocalDate.of(2024, 9, 30))).to.be.true;
	});

	const janStartFY = LocalDate.of(2024, 1, 1);
	it('should handle leap year correctly (Q1: Jan 1 - Mar 31)', () => {
		expect(getFiscalQuarter(dates.feb_29_2024, dates.dec_31_2020)).to.equal(1);
		const range = getFiscalQuarterRange(dates.feb_29_2024, dates.dec_31_2020);
		expect(range.start.equals(janStartFY)).to.be.true;
		expect(range.end.equals(LocalDate.of(2024, 3, 31))).to.be.true;
	});

	const date = LocalDate.of(2025, 1, 15);
	it('should return the full fiscal year range when period is Yearly', () => {
		const expectedFYRange = getFiscalYearRange(date, dates.jun_30_2020);
		expect(getFiscalRange(PeriodEnum.Yearly, date, dates.jun_30_2020)).to.deep.equal(expectedFYRange);
		expect(getFiscalRange(PeriodEnum.Yearly, date, dates.jun_30_2020).start.equals(LocalDate.of(2024, 7, 1))).to.be.true;
		expect(getFiscalRange(PeriodEnum.Yearly, date, dates.jun_30_2020).end.equals(LocalDate.of(2025, 6, 30))).to.be.true;
	});

	it('should return the fiscal quarter range when period is Quarterly', () => {
		const expectedQRange = getFiscalQuarterRange(date, dates.jun_30_2020);
		expect(getFiscalRange(PeriodEnum.Quarterly, date, dates.jun_30_2020)).to.deep.equal(expectedQRange);
		expect(getFiscalRange(PeriodEnum.Quarterly, date, dates.jun_30_2020).start.equals(LocalDate.of(2025, 1, 1))).to.be.true;
		expect(getFiscalRange(PeriodEnum.Quarterly, date, dates.jun_30_2020).end.equals(LocalDate.of(2025, 3, 31))).to.be.true;
	});
});
