import Money from 'js-money';
import Currencies from 'js-money/lib/currency';

function isString(x: any): x is string {
	return typeof x === 'string';
}

function isNumber(x: any): x is number {
	return typeof x === 'number';
}

interface MoneyObject {
	currency: string;
	amount: number;
}
function isMoney(x: any): x is Money {
	return x instanceof Money;
}

function isMoneyObject(x: any): x is MoneyObject {
	return (x as MoneyObject).amount !== undefined;
}

export default function toMoney(
	value: Money | undefined | null | number | string | MoneyObject,
	currency: Currencies.Currency = Money.CAD,
): Money {
	if (isMoney(value)) return value;
	if (!value) return new Money(0, currency);
	if (isNumber(value)) return Money.fromDecimal(value, currency, 'round');
	if (isMoneyObject(value)) return new Money(value.amount, value.currency);
	if (isString(value)) return Money.fromDecimal(parseFloat(value), currency, 'round');
	throw new Error(`Can't convert value to Money: ${value}.`);
}
