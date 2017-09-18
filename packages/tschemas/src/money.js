// @flow

import {mixed} from 'yup';
import Money from 'js-money';
import isNull from 'lodash/isNull';

/**
 * Validates a Money (from js-money).
 */
class MoneySchema extends mixed {
	constructor() {
		super({type: 'moneyschema'});

		this.transforms.push(value => {
			if (this.isType(value)) return value;

			if (isNull(value)) return null;
			if (value.amount && value.currency) return new Money(value.amount, value.currency);
			return null;
		});
	}

	_typeCheck(v: Object) {
		return v instanceof Money;
	}
}

export const money = () => new MoneySchema();
