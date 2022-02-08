import {LocalTime} from '@js-joda/core';
import {Query} from 'mingo';
import './index';

describe('LocalTime Operators', () => {
	it('should compare $eq', () => {
		const obj = {
			a: LocalTime.ofSecondOfDay(50),
			b: LocalTime.ofSecondOfDay(100),
			c: LocalTime.ofSecondOfDay(150),
		};
		const time = LocalTime.ofSecondOfDay(100);

		const q1 = new Query({a: {$localTime_eq: time}});
		const q2 = new Query({b: {$localTime_eq: time}});
		const q3 = new Query({c: {$localTime_eq: time}});

		expect(q1.test(obj)).toBe(false);
		expect(q2.test(obj)).toBe(true);
		expect(q3.test(obj)).toBe(false);
	});

	it('should compare $gt', () => {
		const obj = {
			a: LocalTime.ofSecondOfDay(50),
			b: LocalTime.ofSecondOfDay(100),
			c: LocalTime.ofSecondOfDay(150),
		};
		const time = LocalTime.ofSecondOfDay(100);

		const q1 = new Query({a: {$localTime_gt: time}});
		const q2 = new Query({b: {$localTime_gt: time}});
		const q3 = new Query({c: {$localTime_gt: time}});

		expect(q1.test(obj)).toBe(false);
		expect(q2.test(obj)).toBe(false);
		expect(q3.test(obj)).toBe(true);
	});

	it('should compare $gte', () => {
		const obj = {
			a: LocalTime.ofSecondOfDay(50),
			b: LocalTime.ofSecondOfDay(100),
			c: LocalTime.ofSecondOfDay(150),
		};
		const time = LocalTime.ofSecondOfDay(100);

		const q1 = new Query({a: {$localTime_gte: time}});
		const q2 = new Query({b: {$localTime_gte: time}});
		const q3 = new Query({c: {$localTime_gte: time}});

		expect(q1.test(obj)).toBe(false);
		expect(q2.test(obj)).toBe(true);
		expect(q3.test(obj)).toBe(true);
	});

	it('should compare $lt', () => {
		const obj = {
			a: LocalTime.ofSecondOfDay(50),
			b: LocalTime.ofSecondOfDay(100),
			c: LocalTime.ofSecondOfDay(150),
		};
		const time = LocalTime.ofSecondOfDay(100);

		const q1 = new Query({a: {$localTime_lt: time}});
		const q2 = new Query({b: {$localTime_lt: time}});
		const q3 = new Query({c: {$localTime_lt: time}});

		expect(q1.test(obj)).toBe(true);
		expect(q2.test(obj)).toBe(false);
		expect(q3.test(obj)).toBe(false);
	});

	it('should compare $lte', () => {
		const obj = {
			a: LocalTime.ofSecondOfDay(50),
			b: LocalTime.ofSecondOfDay(100),
			c: LocalTime.ofSecondOfDay(150),
		};
		const time = LocalTime.ofSecondOfDay(100);

		const q1 = new Query({a: {$localTime_lte: time}});
		const q2 = new Query({b: {$localTime_lte: time}});
		const q3 = new Query({c: {$localTime_lte: time}});

		expect(q1.test(obj)).toBe(true);
		expect(q2.test(obj)).toBe(true);
		expect(q3.test(obj)).toBe(false);
	});

	it('should compare $in', () => {
		const obj = {
			a: LocalTime.ofSecondOfDay(50),
			b: LocalTime.ofSecondOfDay(100),
			c: LocalTime.ofSecondOfDay(150),
		};
		const times = [LocalTime.ofSecondOfDay(30), LocalTime.ofSecondOfDay(100), LocalTime.ofSecondOfDay(180)];

		const q1 = new Query({a: {$localTime_in: times}});
		const q2 = new Query({b: {$localTime_in: times}});
		const q3 = new Query({c: {$localTime_in: times}});

		expect(q1.test(obj)).toBe(false);
		expect(q2.test(obj)).toBe(true);
		expect(q3.test(obj)).toBe(false);
	});

	it('should compare $ne', () => {
		const obj = {
			a: LocalTime.ofSecondOfDay(50),
			b: LocalTime.ofSecondOfDay(100),
			c: LocalTime.ofSecondOfDay(150),
		};
		const time = LocalTime.ofSecondOfDay(100);

		const q1 = new Query({a: {$localTime_ne: time}});
		const q2 = new Query({b: {$localTime_ne: time}});
		const q3 = new Query({c: {$localTime_ne: time}});

		expect(q1.test(obj)).toBe(true);
		expect(q2.test(obj)).toBe(false);
		expect(q3.test(obj)).toBe(true);
	});

	it('should compare $nin', () => {
		const obj = {
			a: LocalTime.ofSecondOfDay(50),
			b: LocalTime.ofSecondOfDay(100),
			c: LocalTime.ofSecondOfDay(150),
		};
		const times = [LocalTime.ofSecondOfDay(30), LocalTime.ofSecondOfDay(100), LocalTime.ofSecondOfDay(180)];

		const q1 = new Query({a: {$localTime_nin: times}});
		const q2 = new Query({b: {$localTime_nin: times}});
		const q3 = new Query({c: {$localTime_nin: times}});

		expect(q1.test(obj)).toBe(true);
		expect(q2.test(obj)).toBe(false);
		expect(q3.test(obj)).toBe(true);
	});
});
