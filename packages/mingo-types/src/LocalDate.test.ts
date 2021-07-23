import {LocalDate} from '@js-joda/core';
import {Query} from 'mingo';
import './index';

describe('LocalDate Operators', () => {
	it('should compare $eq', () => {
		const obj = {
			a: LocalDate.ofEpochDay(50),
			b: LocalDate.ofEpochDay(100),
			c: LocalDate.ofEpochDay(150),
		};
		const date = LocalDate.ofEpochDay(100);

		const q1 = new Query({a: {$localDate_eq: date}});
		const q2 = new Query({b: {$localDate_eq: date}});
		const q3 = new Query({c: {$localDate_eq: date}});

		expect(q1.test(obj)).toBe(false);
		expect(q2.test(obj)).toBe(true);
		expect(q3.test(obj)).toBe(false);
	});

	it('should compare $gt', () => {
		const obj = {
			a: LocalDate.ofEpochDay(50),
			b: LocalDate.ofEpochDay(100),
			c: LocalDate.ofEpochDay(150),
		};
		const date = LocalDate.ofEpochDay(100);

		const q1 = new Query({a: {$localDate_gt: date}});
		const q2 = new Query({b: {$localDate_gt: date}});
		const q3 = new Query({c: {$localDate_gt: date}});

		expect(q1.test(obj)).toBe(false);
		expect(q2.test(obj)).toBe(false);
		expect(q3.test(obj)).toBe(true);
	});

	it('should compare $gte', () => {
		const obj = {
			a: LocalDate.ofEpochDay(50),
			b: LocalDate.ofEpochDay(100),
			c: LocalDate.ofEpochDay(150),
		};
		const date = LocalDate.ofEpochDay(100);

		const q1 = new Query({a: {$localDate_gte: date}});
		const q2 = new Query({b: {$localDate_gte: date}});
		const q3 = new Query({c: {$localDate_gte: date}});

		expect(q1.test(obj)).toBe(false);
		expect(q2.test(obj)).toBe(true);
		expect(q3.test(obj)).toBe(true);
	});

	it('should compare $lt', () => {
		const obj = {
			a: LocalDate.ofEpochDay(50),
			b: LocalDate.ofEpochDay(100),
			c: LocalDate.ofEpochDay(150),
		};
		const date = LocalDate.ofEpochDay(100);

		const q1 = new Query({a: {$localDate_lt: date}});
		const q2 = new Query({b: {$localDate_lt: date}});
		const q3 = new Query({c: {$localDate_lt: date}});

		expect(q1.test(obj)).toBe(true);
		expect(q2.test(obj)).toBe(false);
		expect(q3.test(obj)).toBe(false);
	});

	it('should compare $lte', () => {
		const obj = {
			a: LocalDate.ofEpochDay(50),
			b: LocalDate.ofEpochDay(100),
			c: LocalDate.ofEpochDay(150),
		};
		const date = LocalDate.ofEpochDay(100);

		const q1 = new Query({a: {$localDate_lte: date}});
		const q2 = new Query({b: {$localDate_lte: date}});
		const q3 = new Query({c: {$localDate_lte: date}});

		expect(q1.test(obj)).toBe(true);
		expect(q2.test(obj)).toBe(true);
		expect(q3.test(obj)).toBe(false);
	});

	it('should compare $in', () => {
		const obj = {
			a: LocalDate.ofEpochDay(50),
			b: LocalDate.ofEpochDay(100),
			c: LocalDate.ofEpochDay(150),
		};
		const dates = [LocalDate.ofEpochDay(30), LocalDate.ofEpochDay(100), LocalDate.ofEpochDay(180)];

		const q1 = new Query({a: {$localDate_in: dates}});
		const q2 = new Query({b: {$localDate_in: dates}});
		const q3 = new Query({c: {$localDate_in: dates}});

		expect(q1.test(obj)).toBe(false);
		expect(q2.test(obj)).toBe(true);
		expect(q3.test(obj)).toBe(false);
	});

	it('should compare $ne', () => {
		const obj = {
			a: LocalDate.ofEpochDay(50),
			b: LocalDate.ofEpochDay(100),
			c: LocalDate.ofEpochDay(150),
		};
		const date = LocalDate.ofEpochDay(100);

		const q1 = new Query({a: {$localDate_ne: date}});
		const q2 = new Query({b: {$localDate_ne: date}});
		const q3 = new Query({c: {$localDate_ne: date}});

		expect(q1.test(obj)).toBe(true);
		expect(q2.test(obj)).toBe(false);
		expect(q3.test(obj)).toBe(true);
	});

	it('should compare $nin', () => {
		const obj = {
			a: LocalDate.ofEpochDay(50),
			b: LocalDate.ofEpochDay(100),
			c: LocalDate.ofEpochDay(150),
		};
		const dates = [LocalDate.ofEpochDay(30), LocalDate.ofEpochDay(100), LocalDate.ofEpochDay(180)];

		const q1 = new Query({a: {$localDate_nin: dates}});
		const q2 = new Query({b: {$localDate_nin: dates}});
		const q3 = new Query({c: {$localDate_nin: dates}});

		expect(q1.test(obj)).toBe(true);
		expect(q2.test(obj)).toBe(false);
		expect(q3.test(obj)).toBe(true);
	});
});
