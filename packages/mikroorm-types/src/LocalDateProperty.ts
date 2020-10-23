import {Type, ValidationError} from '@mikro-orm/core';
import {toEpochDay, toLocalDate} from '@thx/date';

export class LocalDateProperty extends Type {
	convertToDatabaseValue(value: any): any {
		try {
			return toEpochDay(value);
		} catch (err) {
			throw ValidationError.invalidType(LocalDateProperty, value, 'JS');
		}
	}

	convertToJSValue(value: any): any {
		try {
			return toLocalDate(value);
		} catch (err) {
			throw ValidationError.invalidType(LocalDateProperty, value, 'database');
		}
	}

	getColumnType() {
		return 'bigint';
	}
}
