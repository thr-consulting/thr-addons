import {MixedSchema} from 'yup';
import Money from 'js-money';
import {isMoneyObject, toMoney} from '@thx/money';

class MoneySchemaType extends MixedSchema<Money> {
	constructor() {
		super();

		this.withMutation(() => {
			this.transform(function transform(value) {
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
