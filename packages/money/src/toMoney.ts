import Money from 'js-money';
import Currencies from 'js-money/lib/currency';

function isString(x: any): x is string {
	return typeof x === 'string';
}

function isNumber(x: any): x is number {
	return typeof x === 'number';
}

export interface IMoneyObject {
	currency: string;
	amount: number;
}

export function isMoney(x: any): x is Money {
	return x instanceof Money;
}

export function isMoneyObject(x: any): x is IMoneyObject {
	return (x as IMoneyObject).amount !== undefined && (x as IMoneyObject).currency !== undefined;
}

export function toMoney(value: Money | undefined | null | number | string | IMoneyObject = null, currency: Currencies.Currency = Money.CAD): Money {
	if (isMoney(value)) return value;
	if (!value) return new Money(0, currency);
	if (isNumber(value)) return Money.fromDecimal(value, currency, 'round');
	if (isMoneyObject(value)) return new Money(value.amount, value.currency);
	if (isString(value)) return Money.fromDecimal(parseFloat(value), currency, 'round');
	throw new Error(`Can't convert value to Money: ${value}.`);
}
