import {isMoneyObject, toMoney} from '@thx/money';
import Money from 'js-money';
import {MixedSchema} from 'yup';

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
}

export function moneySchemaType() {
	return new MoneySchemaType();
}
