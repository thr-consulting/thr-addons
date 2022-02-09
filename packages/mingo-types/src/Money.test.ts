import {toMoney} from '@thx/money';
import {Query} from 'mingo';
import './index';

describe('Money Operators', () => {
	it('should compare $eq', () => {
		const obj = {
			a: toMoney(50),
			b: toMoney(100),
			c: toMoney(150),
		};
		const money = toMoney(100);

		const q1 = new Query({a: {$money_eq: money}});
		const q2 = new Query({b: {$money_eq: money}});
		const q3 = new Query({c: {$money_eq: money}});

		expect(q1.test(obj)).toBe(false);
		expect(q2.test(obj)).toBe(true);
		expect(q3.test(obj)).toBe(false);
	});

	it('should compare $gt', () => {
		const obj = {
			a: toMoney(50),
			b: toMoney(100),
			c: toMoney(150),
		};
		const money = toMoney(100);

		const q1 = new Query({a: {$money_gt: money}});
		const q2 = new Query({b: {$money_gt: money}});
		const q3 = new Query({c: {$money_gt: money}});

		expect(q1.test(obj)).toBe(false);
		expect(q2.test(obj)).toBe(false);
		expect(q3.test(obj)).toBe(true);
	});

	it('should compare $gte', () => {
		const obj = {
			a: toMoney(50),
			b: toMoney(100),
			c: toMoney(150),
		};
		const money = toMoney(100);

		const q1 = new Query({a: {$money_gte: money}});
		const q2 = new Query({b: {$money_gte: money}});
		const q3 = new Query({c: {$money_gte: money}});

		expect(q1.test(obj)).toBe(false);
		expect(q2.test(obj)).toBe(true);
		expect(q3.test(obj)).toBe(true);
	});

	it('should compare $lt', () => {
		const obj = {
			a: toMoney(50),
			b: toMoney(100),
			c: toMoney(150),
		};
		const money = toMoney(100);

		const q1 = new Query({a: {$money_lt: money}});
		const q2 = new Query({b: {$money_lt: money}});
		const q3 = new Query({c: {$money_lt: money}});

		expect(q1.test(obj)).toBe(true);
		expect(q2.test(obj)).toBe(false);
		expect(q3.test(obj)).toBe(false);
	});

	it('should compare $lte', () => {
		const obj = {
			a: toMoney(50),
			b: toMoney(100),
			c: toMoney(150),
		};
		const money = toMoney(100);

		const q1 = new Query({a: {$money_lte: money}});
		const q2 = new Query({b: {$money_lte: money}});
		const q3 = new Query({c: {$money_lte: money}});

		expect(q1.test(obj)).toBe(true);
		expect(q2.test(obj)).toBe(true);
		expect(q3.test(obj)).toBe(false);
	});

	it('should compare $in', () => {
		const obj = {
			a: toMoney(50),
			b: toMoney(100),
			c: toMoney(150),
		};
		const moneys = [toMoney(30), toMoney(100), toMoney(180)];

		const q1 = new Query({a: {$money_in: moneys}});
		const q2 = new Query({b: {$money_in: moneys}});
		const q3 = new Query({c: {$money_in: moneys}});

		expect(q1.test(obj)).toBe(false);
		expect(q2.test(obj)).toBe(true);
		expect(q3.test(obj)).toBe(false);
	});

	it('should compare $ne', () => {
		const obj = {
			a: toMoney(50),
			b: toMoney(100),
			c: toMoney(150),
		};
		const money = toMoney(100);

		const q1 = new Query({a: {$money_ne: money}});
		const q2 = new Query({b: {$money_ne: money}});
		const q3 = new Query({c: {$money_ne: money}});

		expect(q1.test(obj)).toBe(true);
		expect(q2.test(obj)).toBe(false);
		expect(q3.test(obj)).toBe(true);
	});

	it('should compare $nin', () => {
		const obj = {
			a: toMoney(50),
			b: toMoney(100),
			c: toMoney(150),
		};
		const moneys = [toMoney(30), toMoney(100), toMoney(180)];

		const q1 = new Query({a: {$money_nin: moneys}});
		const q2 = new Query({b: {$money_nin: moneys}});
		const q3 = new Query({c: {$money_nin: moneys}});

		expect(q1.test(obj)).toBe(true);
		expect(q2.test(obj)).toBe(false);
		expect(q3.test(obj)).toBe(true);
	});
});
