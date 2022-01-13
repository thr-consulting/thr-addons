import type Money from 'js-money';
import type {TransactionType} from './TransactionType';

export interface Originator {
	id: number; // 10 digits
	longName: string; // 30 chars
	shortName: string; // 15 chars
	userId: string; // 10 chars
}

export interface Institution {
	route: number; // 3 digits
	transit: number; // 5 digits
}

export interface Target {
	institution: Institution;
	accountNum: string; // 12 digits
	name: string; // 30 characters
}

export interface Send {
	type: TransactionType;
	amount: Money;
	payee: Target;
	sequence: number;
	id: string;
}

export interface Receive {
	type: TransactionType;
	amount: Money;
	payor: Target;
	sequence: number;
	id: string;
}

export interface Returns {
	institution: Institution;
	accountNum: string; // 12 digits
}
