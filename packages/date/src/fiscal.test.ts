import {LocalDate, Period} from '@js-joda/core';
import {expect} from 'chai';
import {getFiscalYear, getFiscalPeriod, getFiscalYearRange, PeriodEnum, PeriodEnumLookup} from './fiscal';

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

	it('should return the correct fiscal year based on the date and year end', () => {
		const yearEnd = LocalDate.of(2020, 12, 31);
		expect(getFiscalYear(LocalDate.of(2020, 1, 1), yearEnd)).to.equal(2020);
		expect(getFiscalYear(LocalDate.of(2020, 12, 31), yearEnd)).to.equal(2020);
		expect(getFiscalYear(LocalDate.of(2021, 1, 1), yearEnd)).to.equal(2021);
		expect(getFiscalYear(LocalDate.of(2021, 12, 31), yearEnd)).to.equal(2021);
		expect(getFiscalYear(LocalDate.of(2020, 12, 31), yearEnd)).to.equal(2020);
	});
});
