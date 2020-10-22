import {mixed} from 'yup';
import {LocalDate} from '@js-joda/core';

class LocalDateSchemaType extends mixed {
	constructor() {
		super();

		this.withMutation(() => {
			this.transform(function transform(value) {
				if (this.isType(value)) return value;
				return null;
			});
		});
	}

	_typeCheck(value: any) {
		return value instanceof LocalDate;
	}
}

export function localDateSchemaType() {
	return new LocalDateSchemaType();
}
