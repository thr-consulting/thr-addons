import {Type, ValidationError} from '@mikro-orm/core';
import {isMoneyObject, toMoney} from '@thx/money';

export class MoneyProperty extends Type {
	convertToDatabaseValue(value: any): any {
		try {
			if (!value) return value;
			if (!isMoneyObject(value)) throw new Error();
			return JSON.stringify(value);
		} catch {
			throw ValidationError.invalidType(MoneyProperty, value, 'JS');
		}
	}

	convertToJSValue(value: any): any {
		try {
			if (!value) return value;

			if (typeof value === 'string') {
				const parsed = JSON.parse(value);
				return toMoney(parsed);
			}

			return toMoney(value);
		} catch {
			throw ValidationError.invalidType(MoneyProperty, value, 'database');
		}
	}

	getColumnType() {
		return 'jsonb';
	}
}
