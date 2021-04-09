import {Type, ValidationError} from '@mikro-orm/core';

export class DecimalProperty extends Type {
	convertToDatabaseValue(value: any): any {
		try {
			if (!value) return value;
			if (!parseFloat(value)) throw new Error();
			return JSON.stringify(value);
		} catch (err) {
			throw ValidationError.invalidType(DecimalProperty, value, 'JS');
		}
	}

	convertToJSValue(value: string): any {
		try {
			if (!value) return value;
			const number = parseFloat(value);
			if (!number) throw new Error();
			return number;
		} catch (err) {
			throw ValidationError.invalidType(DecimalProperty, value, 'database');
		}
	}

	getColumnType() {
		return 'decimal';
	}
}
