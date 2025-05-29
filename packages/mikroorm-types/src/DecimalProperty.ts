import {Type, ValidationError} from '@mikro-orm/core';

export class DecimalProperty extends Type {
	convertToDatabaseValue(value: any): any {
		try {
			if (value === undefined || value === null) return value;
			const number = parseFloat(value);
			if (Number.isNaN(number)) throw new Error();
			return JSON.stringify(number);
		} catch {
			throw ValidationError.invalidType(DecimalProperty, value, 'JS');
		}
	}

	convertToJSValue(value: string): any {
		try {
			if (value === undefined || value === null) return value;
			const number = parseFloat(value);
			if (Number.isNaN(number)) throw new Error();
			return number;
		} catch {
			throw ValidationError.invalidType(DecimalProperty, value, 'database');
		}
	}

	getColumnType() {
		return 'decimal';
	}
}
