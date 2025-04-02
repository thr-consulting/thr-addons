import {toLocalDate, toLocalDateTime, toLocalTime} from '@thx/date';
import {toMoney} from '@thx/money';
import {addOperators, type AddOperatorsMap, OperatorType} from 'mingo/core';

type Convert<T> = (value: any) => T;
type Compare<T> = (lhs: T, rhs: T) => boolean;

function compare<T>(convert: Convert<T>, compareFn: Compare<T>) {
	return (selector: string, lhs: unknown, rhs: unknown) => {
		return compareFn(convert(lhs), convert(rhs));
	};
}

function some<T>(convert: Convert<T>, compareFn: Compare<T>) {
	return (selector: string, lhs: unknown, rhs: unknown) => {
		if (!Array.isArray(rhs)) throw new Error(`Custom operator error: right-hand side is not an array`);
		return (rhs as T[]).some(v => compareFn(convert(lhs), convert(v)));
	};
}

function none<T>(convert: Convert<T>, compareFn: Compare<T>) {
	return (selector: string, lhs: unknown, rhs: unknown) => {
		if (!Array.isArray(rhs)) throw new Error(`Custom operator error: right-hand side is not an array`);
		return !(rhs as T[]).some(v => compareFn(convert(lhs), convert(v)));
	};
}

addOperators(OperatorType.QUERY, (): AddOperatorsMap => {
	return {
		$localDate_eq: compare(toLocalDate, (lhs, rhs) => lhs.isEqual(rhs)),
		$localDate_gt: compare(toLocalDate, (lhs, rhs) => lhs.isAfter(rhs)),
		$localDate_gte: compare(toLocalDate, (lhs, rhs) => lhs.isEqual(rhs) || lhs.isAfter(rhs)),
		$localDate_lt: compare(toLocalDate, (lhs, rhs) => lhs.isBefore(rhs)),
		$localDate_lte: compare(toLocalDate, (lhs, rhs) => lhs.isEqual(rhs) || lhs.isBefore(rhs)),
		$localDate_in: some(toLocalDate, (lhs, rhs) => lhs.isEqual(rhs)),
		$localDate_ne: compare(toLocalDate, (lhs, rhs) => !lhs.isEqual(rhs)),
		$localDate_nin: none(toLocalDate, (lhs, rhs) => lhs.isEqual(rhs)),

		$localDateTime_eq: compare(toLocalDateTime, (lhs, rhs) => lhs.isEqual(rhs)),
		$localDateTime_gt: compare(toLocalDateTime, (lhs, rhs) => lhs.isAfter(rhs)),
		$localDateTime_gte: compare(toLocalDateTime, (lhs, rhs) => lhs.isEqual(rhs) || lhs.isAfter(rhs)),
		$localDateTime_lt: compare(toLocalDateTime, (lhs, rhs) => lhs.isBefore(rhs)),
		$localDateTime_lte: compare(toLocalDateTime, (lhs, rhs) => lhs.isEqual(rhs) || lhs.isBefore(rhs)),
		$localDateTime_in: some(toLocalDateTime, (lhs, rhs) => lhs.isEqual(rhs)),
		$localDateTime_ne: compare(toLocalDateTime, (lhs, rhs) => !lhs.isEqual(rhs)),
		$localDateTime_nin: none(toLocalDateTime, (lhs, rhs) => lhs.isEqual(rhs)),

		$localTime_eq: compare(toLocalTime, (lhs, rhs) => lhs.equals(rhs)),
		$localTime_gt: compare(toLocalTime, (lhs, rhs) => lhs.isAfter(rhs)),
		$localTime_gte: compare(toLocalTime, (lhs, rhs) => lhs.equals(rhs) || lhs.isAfter(rhs)),
		$localTime_lt: compare(toLocalTime, (lhs, rhs) => lhs.isBefore(rhs)),
		$localTime_lte: compare(toLocalTime, (lhs, rhs) => lhs.equals(rhs) || lhs.isBefore(rhs)),
		$localTime_in: some(toLocalTime, (lhs, rhs) => lhs.equals(rhs)),
		$localTime_ne: compare(toLocalTime, (lhs, rhs) => !lhs.equals(rhs)),
		$localTime_nin: none(toLocalTime, (lhs, rhs) => lhs.equals(rhs)),

		$money_eq: compare(toMoney, (lhs, rhs) => lhs.equals(rhs)),
		$money_gt: compare(toMoney, (lhs, rhs) => lhs.greaterThan(rhs)),
		$money_gte: compare(toMoney, (lhs, rhs) => lhs.greaterThanOrEqual(rhs)),
		$money_lt: compare(toMoney, (lhs, rhs) => lhs.lessThan(rhs)),
		$money_lte: compare(toMoney, (lhs, rhs) => lhs.lessThanOrEqual(rhs)),
		$money_in: some(toMoney, (lhs, rhs) => lhs.equals(rhs)),
		$money_ne: compare(toMoney, (lhs, rhs) => !lhs.equals(rhs)),
		$money_nin: none(toMoney, (lhs, rhs) => lhs.equals(rhs)),
	};
});
