import {LocalDateTime, ZoneOffset} from '@js-joda/core';
import {Query} from 'mingo';
import './index';

describe('LocalDateTimeTime Operators', () => {
	it('should compare $eq', () => {
		const obj = {
			a: LocalDateTime.ofEpochSecond(50, 0, ZoneOffset.UTC),
			b: LocalDateTime.ofEpochSecond(100, 0, ZoneOffset.UTC),
			c: LocalDateTime.ofEpochSecond(150, 0, ZoneOffset.UTC),
		};
		const date = LocalDateTime.ofEpochSecond(100, 0, ZoneOffset.UTC);

		const q1 = new Query({a: {$localDateTime_eq: date}});
		const q2 = new Query({b: {$localDateTime_eq: date}});
		const q3 = new Query({c: {$localDateTime_eq: date}});

		expect(q1.test(obj)).toBe(false);
		expect(q2.test(obj)).toBe(true);
		expect(q3.test(obj)).toBe(false);
	});

	it('should compare $gt', () => {
		const obj = {
			a: LocalDateTime.ofEpochSecond(50, 0, ZoneOffset.UTC),
			b: LocalDateTime.ofEpochSecond(100, 0, ZoneOffset.UTC),
			c: LocalDateTime.ofEpochSecond(150, 0, ZoneOffset.UTC),
		};
		const date = LocalDateTime.ofEpochSecond(100, 0, ZoneOffset.UTC);

		const q1 = new Query({a: {$localDateTime_gt: date}});
		const q2 = new Query({b: {$localDateTime_gt: date}});
		const q3 = new Query({c: {$localDateTime_gt: date}});

		expect(q1.test(obj)).toBe(false);
		expect(q2.test(obj)).toBe(false);
		expect(q3.test(obj)).toBe(true);
	});

	it('should compare $gte', () => {
		const obj = {
			a: LocalDateTime.ofEpochSecond(50, 0, ZoneOffset.UTC),
			b: LocalDateTime.ofEpochSecond(100, 0, ZoneOffset.UTC),
			c: LocalDateTime.ofEpochSecond(150, 0, ZoneOffset.UTC),
		};
		const date = LocalDateTime.ofEpochSecond(100, 0, ZoneOffset.UTC);

		const q1 = new Query({a: {$localDateTime_gte: date}});
		const q2 = new Query({b: {$localDateTime_gte: date}});
		const q3 = new Query({c: {$localDateTime_gte: date}});

		expect(q1.test(obj)).toBe(false);
		expect(q2.test(obj)).toBe(true);
		expect(q3.test(obj)).toBe(true);
	});

	it('should compare $lt', () => {
		const obj = {
			a: LocalDateTime.ofEpochSecond(50, 0, ZoneOffset.UTC),
			b: LocalDateTime.ofEpochSecond(100, 0, ZoneOffset.UTC),
			c: LocalDateTime.ofEpochSecond(150, 0, ZoneOffset.UTC),
		};
		const date = LocalDateTime.ofEpochSecond(100, 0, ZoneOffset.UTC);

		const q1 = new Query({a: {$localDateTime_lt: date}});
		const q2 = new Query({b: {$localDateTime_lt: date}});
		const q3 = new Query({c: {$localDateTime_lt: date}});

		expect(q1.test(obj)).toBe(true);
		expect(q2.test(obj)).toBe(false);
		expect(q3.test(obj)).toBe(false);
	});

	it('should compare $lte', () => {
		const obj = {
			a: LocalDateTime.ofEpochSecond(50, 0, ZoneOffset.UTC),
			b: LocalDateTime.ofEpochSecond(100, 0, ZoneOffset.UTC),
			c: LocalDateTime.ofEpochSecond(150, 0, ZoneOffset.UTC),
		};
		const date = LocalDateTime.ofEpochSecond(100, 0, ZoneOffset.UTC);

		const q1 = new Query({a: {$localDateTime_lte: date}});
		const q2 = new Query({b: {$localDateTime_lte: date}});
		const q3 = new Query({c: {$localDateTime_lte: date}});

		expect(q1.test(obj)).toBe(true);
		expect(q2.test(obj)).toBe(true);
		expect(q3.test(obj)).toBe(false);
	});

	it('should compare $in', () => {
		const obj = {
			a: LocalDateTime.ofEpochSecond(50, 0, ZoneOffset.UTC),
			b: LocalDateTime.ofEpochSecond(100, 0, ZoneOffset.UTC),
			c: LocalDateTime.ofEpochSecond(150, 0, ZoneOffset.UTC),
		};
		const dates = [
			LocalDateTime.ofEpochSecond(30, 0, ZoneOffset.UTC),
			LocalDateTime.ofEpochSecond(100, 0, ZoneOffset.UTC),
			LocalDateTime.ofEpochSecond(180, 0, ZoneOffset.UTC),
		];

		const q1 = new Query({a: {$localDateTime_in: dates}});
		const q2 = new Query({b: {$localDateTime_in: dates}});
		const q3 = new Query({c: {$localDateTime_in: dates}});

		expect(q1.test(obj)).toBe(false);
		expect(q2.test(obj)).toBe(true);
		expect(q3.test(obj)).toBe(false);
	});

	it('should compare $ne', () => {
		const obj = {
			a: LocalDateTime.ofEpochSecond(50, 0, ZoneOffset.UTC),
			b: LocalDateTime.ofEpochSecond(100, 0, ZoneOffset.UTC),
			c: LocalDateTime.ofEpochSecond(150, 0, ZoneOffset.UTC),
		};
		const date = LocalDateTime.ofEpochSecond(100, 0, ZoneOffset.UTC);

		const q1 = new Query({a: {$localDateTime_ne: date}});
		const q2 = new Query({b: {$localDateTime_ne: date}});
		const q3 = new Query({c: {$localDateTime_ne: date}});

		expect(q1.test(obj)).toBe(true);
		expect(q2.test(obj)).toBe(false);
		expect(q3.test(obj)).toBe(true);
	});

	it('should compare $nin', () => {
		const obj = {
			a: LocalDateTime.ofEpochSecond(50, 0, ZoneOffset.UTC),
			b: LocalDateTime.ofEpochSecond(100, 0, ZoneOffset.UTC),
			c: LocalDateTime.ofEpochSecond(150, 0, ZoneOffset.UTC),
		};
		const dates = [
			LocalDateTime.ofEpochSecond(30, 0, ZoneOffset.UTC),
			LocalDateTime.ofEpochSecond(100, 0, ZoneOffset.UTC),
			LocalDateTime.ofEpochSecond(180, 0, ZoneOffset.UTC),
		];

		const q1 = new Query({a: {$localDateTime_nin: dates}});
		const q2 = new Query({b: {$localDateTime_nin: dates}});
		const q3 = new Query({c: {$localDateTime_nin: dates}});

		expect(q1.test(obj)).toBe(true);
		expect(q2.test(obj)).toBe(false);
		expect(q3.test(obj)).toBe(true);
	});
});
