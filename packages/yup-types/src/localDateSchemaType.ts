import {LocalDate} from '@js-joda/core';
import {MixedSchema, type AnyObject, type Flags, type Maybe} from 'yup';

class LocalDateSchemaType<
	TType extends Maybe<LocalDate> = LocalDate | undefined,
	TContext = AnyObject,
	TDefault = undefined,
	TFlags extends Flags = '',
> extends MixedSchema<TType, TContext, TDefault, TFlags> {
	constructor() {
		super({
			type: 'localDate',
			check(value: any): value is NonNullable<TType> {
				return value instanceof LocalDate;
			},
		});

		this.withMutation(() => {
			this.transform(function transform(value) {
				if (this.isType(value)) return value;
				return null;
			});
		});
	}
}

export function localDateSchemaType() {
	return new LocalDateSchemaType();
}
