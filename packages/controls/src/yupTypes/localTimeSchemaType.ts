import {mixed} from 'yup';
import {LocalTime} from '@js-joda/core';

class LocalTimeSchemaType extends mixed {
	constructor() {
		super();

		this.withMutation(() => {
			this.transform(function(value) {
				if (this.isType(value)) return value;
				return null;
			});
		});
	}

	_typeCheck(value: any) {
		return value instanceof LocalTime;
	}
}

export function localTimeSchemaType() {
	return new LocalTimeSchemaType();
}