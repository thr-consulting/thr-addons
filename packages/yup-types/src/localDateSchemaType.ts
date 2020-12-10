import {MixedSchema} from 'yup';
import {LocalDate} from '@js-joda/core';

class LocalDateSchemaType extends MixedSchema<LocalDate> {
	constructor() {
		super();

		this.withMutation(() => {
			this.transform(function transform(value) {
				if (this.isType(value)) return value;
				return null;
			});
		});
	}

	protected _typeCheck(value: any): value is NonNullable<LocalDate> {
		return value instanceof LocalDate;
	}
}

export function localDateSchemaType() {
	return new LocalDateSchemaType();
}
