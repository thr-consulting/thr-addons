import {Type, ValidationError} from '@mikro-orm/core';

export class ImageProperty extends Type {
	convertToDatabaseValue(value: any): any {
		try {
			if (!value) return value;
			if (!value.data || !value.timestamp || !value.type) throw new Error();
			return JSON.stringify(value);
		} catch (err) {
			throw ValidationError.invalidType(ImageProperty, value, 'JS');
		}
	}

	convertToJSValue(value: any): any {
		try {
			if (!value) return value;
			return JSON.parse(value);
		} catch (err) {
			throw ValidationError.invalidType(ImageProperty, value, 'database');
		}
	}

	getColumnType() {
		return 'json';
	}
}
