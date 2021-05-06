import {LocalTime} from '@js-joda/core';
import {MixedSchema} from 'yup';

class LocalTimeSchemaType extends MixedSchema<LocalTime> {
	constructor() {
		super();

		this.withMutation(() => {
			this.transform(function transform(value) {
				if (this.isType(value)) return value;
				return null;
			});
		});
	}

	protected _typeCheck(value: any): value is NonNullable<LocalTime> {
		return value instanceof LocalTime;
	}
}

export function localTimeSchemaType() {
	return new LocalTimeSchemaType();
}
