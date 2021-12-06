import {isMoneyObject, toMoney} from '@thx/money';
import Money from 'js-money';
import {MixedSchema, addMethod} from 'yup';
import type {Maybe} from 'yup/lib/types';

class MoneySchemaType extends MixedSchema<Money> {
	constructor() {
		super();

		this.withMutation(() => {
			this.transform(function transform(value) {
				if (!value) return value;
				if (this.isType(value)) return value;
				if (isMoneyObject(value)) return toMoney(value);

				return null;
			});
		});
	}

	protected _typeCheck(value: any): value is NonNullable<Money> {
		return value instanceof Money;
	}

	max(maxValue: Money, message?: string) {
		return this.test({
			// eslint-disable-next-line no-template-curly-in-string
			message: message || '${path} must be less than or equal to ${max}',
			name: 'max',
			exclusive: true,
			params: {max: maxValue},
			test(value: Maybe<Money>) {
				if (!value) return true;
				return value.compare(maxValue) < 1;
			},
		});
	}

	min(minValue: Money, message?: string) {
		return this.test({
			// eslint-disable-next-line no-template-curly-in-string
			message: message || '${path} must be greater than or equal to ${min}',
			name: 'max',
			exclusive: true,
			params: {min: minValue},
			test(value: Maybe<Money>) {
				if (!value) return true;
				return value.compare(minValue) >= 0;
			},
		});
	}
}

export function moneySchemaType() {
	return new MoneySchemaType();
}
