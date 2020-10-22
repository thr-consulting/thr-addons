import {mixed} from 'yup';
import Money from 'js-money';
import {isMoneyObject, toMoney} from '@thx/money';

class MoneySchemaType extends mixed {
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

	_typeCheck(value: any) {
		return value instanceof Money;
	}
}

export function moneySchemaType() {
	return new MoneySchemaType();
}
