import {LocalTime} from '@js-joda/core';
import {MixedSchema, type AnyObject, type Flags, type Maybe} from 'yup';

class LocalTimeSchemaType<
	TType extends Maybe<LocalTime> = LocalTime | undefined,
	TContext = AnyObject,
	TDefault = undefined,
	TFlags extends Flags = '',
> extends MixedSchema<TType, TContext, TDefault, TFlags> {
	constructor() {
		super({
			type: 'localTime',
			check(value: any): value is NonNullable<TType> {
				return value instanceof LocalTime;
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

export function localTimeSchemaType() {
	return new LocalTimeSchemaType();
}
