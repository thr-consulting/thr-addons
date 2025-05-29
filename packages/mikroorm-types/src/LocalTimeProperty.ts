import {Type, ValidationError} from '@mikro-orm/core';
import {toLocalTime, toSecondOfDay} from '@thx/date';

export class LocalTimeProperty extends Type {
	convertToDatabaseValue(value: any): any {
		try {
			if (!value) return value;
			return toSecondOfDay(value);
		} catch {
			throw ValidationError.invalidType(LocalTimeProperty, value, 'JS');
		}
	}

	convertToJSValue(value: any): any {
		try {
			if (!value) return value;
			return toLocalTime(value);
		} catch {
			throw ValidationError.invalidType(LocalTimeProperty, value, 'database');
		}
	}

	getColumnType() {
		return 'int';
	}
}
