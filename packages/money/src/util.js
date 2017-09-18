import Money from 'js-money';
import accounting from 'accounting';
import transform from 'lodash/transform';
import isNumber from 'lodash/isNumber';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import map from 'lodash/map';

/**
 * Creates a Money object out of a plain Object or decimal. Defaults null to $0 CAD.
 * @param {Object|decimal} objOrDecimal - The object or decimal to convert to Money.
 * @param {string} currency - If converting a decimal, specifies the currency to use.
 * @return {Money}
 */
export function makeMoney(objOrDecimal, currency = 'CAD') {
	if (!objOrDecimal) return new Money(0, Money.CAD);
	if (isNumber(objOrDecimal)) return Money.fromDecimal(objOrDecimal, currency);
	if (objOrDecimal.amount && objOrDecimal.currency) return new Money(objOrDecimal.amount, objOrDecimal.currency);
	return new Money(0, Money.CAD);
}

/**
 * Rounds a decimal value to a certain number of decimal digits.
 * @param {number} value - A number to round.
 * @param {number} decimals - The number of decimal digits to round to.
 * @return {number} - The rounded number.
 */
export function roundTo(value, decimals) {
	return Number(`${Math.round(`${value}e${decimals}`).toString()}e-${decimals}`);
}

/**
 * Formats a Money value to a nice string.
 * @param {Money} money - The Money value
 * @param {bool} symbol - If true displays the proper currency symbol
 * @return {string} The formatted Money string
 */
export function formatMoney(money, symbol = false) {
	return accounting.formatMoney(money.toDecimal(), symbol ? Money[money.currency].symbol_native : '', Money[money.currency].decimal_digits);
}

/**
 * Transforms anything that has Money style objects into Money.
 * @param obj
 * @returns {*}
 */
export function transformObjectsToMoney(obj) {
	if (isArray(obj)) {
		return map(obj, v => transformObjectsToMoney(v));
	}
	if (isObject(obj)) {
		if (obj.amount && obj.currency) return new Money(obj.amount, obj.currency);
		return transform(obj, (result, value, key) => {
			result[key] = transformObjectsToMoney(value); // eslint-disable-line no-param-reassign
		}, {});
	}
	return obj;
}
