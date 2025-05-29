import {formatMoney} from '@thx/money';
import Money, {type CurrencyString} from 'js-money';
import type {Institution, Originator, Receive, Returns, Send, Target} from './types';

export function verifyInteger(num: number, maxLength: number, name: string, opts?: {max?: number; min?: number}): number {
	if (!Number.isInteger(num)) throw new Error(`${name} "${num}" is not an integer`);
	if (num.toString().length > maxLength) throw new Error(`${name} "${num}" cannot be more than ${maxLength} digits`);
	if (opts?.max && num > opts.max) throw new Error(`${name} "${num}" cannot be more than ${opts.max}.`);
	if (opts?.min && num < opts.min) throw new Error(`${name} "${num}" cannot be less than ${opts.min}.`);
	return num;
}

export function verifyString(str: string, maxLength: number, name: string): string {
	if (str.length > maxLength) throw new Error(`${name} "${str}" cannot be more than ${maxLength} characters`);
	return str;
}

export function verifyStringExact(str: string, length: number, name: string): string {
	if (str.length !== length) throw new Error(`${name} "${str}" must be exactly ${length} characters`);
	return str;
}

export function verifyOriginator(orig: Originator): Originator {
	verifyInteger(orig.id, 10, 'Originator ID');
	verifyString(orig.longName, 30, 'Originator long name');
	verifyString(orig.shortName, 15, 'Originator short name');
	verifyString(orig.userId, 10, 'Originator user id');
	return orig;
}

function verifyInstitution(institution: Institution): Institution {
	verifyInteger(institution.route, 3, 'Institution route');
	verifyInteger(institution.transit, 5, 'Institution transit');
	return institution;
}

export function verifyReturns(returns: Returns): Returns {
	verifyInstitution(returns.institution);
	verifyString(returns.accountNum, 12, 'Returns account number');
	return returns;
}

export function verifyAmount(amount: Money, currency: CurrencyString, length: number): Money {
	if (amount.currency !== currency) throw new Error(`Amount "${formatMoney(amount)}" is not of the currency ${currency}`);
	if (amount.isZero()) throw new Error(`Amount "${formatMoney(amount)}" cannot be zero.`);
	if (amount.isNegative()) throw new Error(`Amount "${formatMoney(amount)}" cannot be negative`);
	const wholeAmount = amount.toString().split('.')[0];
	const amountLength = wholeAmount.length + Money[amount.currency].decimal_digits;
	if (amountLength > length) throw new Error(`Amount "${formatMoney(amount)}" cannot exceed ${length} characters (without decimal)`);
	return amount;
}

export function verifyTarget(target: Target): Target {
	verifyInstitution(target.institution);
	verifyString(target.accountNum, 12, 'Target account number');
	verifyString(target.name, 30, 'Target name');
	return target;
}

export function verifySend(send: Send, currency: CurrencyString): Send {
	verifyAmount(send.amount, currency, 10);
	verifyTarget(send.payee);
	verifyInteger(send.sequence, 9, 'Item sequence number');
	if (send.id) verifyStringExact(send.id, 36, 'Cross reference');
	return send;
}

export function verifyReceive(receive: Receive, currency: CurrencyString): Receive {
	verifyAmount(receive.amount, currency, 10);
	verifyTarget(receive.payor);
	verifyInteger(receive.sequence, 9, 'Item sequence number');
	if (receive.id) verifyString(receive.id, 36, 'Cross reference');
	return receive;
}

export function verifyCurrency(currency: CurrencyString): string {
	verifyStringExact(currency, 3, 'Currency code');
	return currency;
}
