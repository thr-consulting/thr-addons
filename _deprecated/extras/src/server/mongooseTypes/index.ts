import debug from 'debug';
import {LocalDate as LD} from 'js-joda';
import {makeMoney} from '@thx/money';
import {transformEpochIntegerToLocalDate, transformLocalDateToEpochInteger} from '@thx/date';
import mongoose from 'mongoose';
import isInteger from 'lodash/isInteger';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';

const d = debug('app.lib.mongooseTypes');

function toBSON(): number {
	// @ts-ignore
	// @ts-ignore
	return transformLocalDateToEpochInteger(this);
}

// Add .toBSON to LocalDate if not defined
// @ts-ignore
if (!LD.prototype.toBSON) { LD.prototype.toBSON = toBSON; }

class LocalDate extends mongoose.SchemaType {
	$conditionalHandlers: object;

	constructor(...params) {
		// @ts-ignore
		super(...params);

		this.$conditionalHandlers = {
		// @ts-ignore
			...mongoose.SchemaType.prototype.$conditionalHandlers,
			$gt: this.cast,
			$gte: this.cast,
			$lt: this.cast,
			$lte: this.cast,
		};
	}

	cast(val: any) {
		// d('Cast:', val);
		if (val instanceof LD) return val;
		if (isInteger(val)) return transformEpochIntegerToLocalDate(val);
		if (isNull(val)) return null;
		if (isUndefined(val)) return undefined;

		throw new Error(`SchemaType LocalDate: ${val} is not a LocalDate (or null, undefined)`);
	}
}

class Money extends mongoose.SchemaType {
	$conditionalHandlers: object;

	constructor(...params) {
		// @ts-ignore
		super(...params);

		this.$conditionalHandlers = {
			// @ts-ignore
			...mongoose.SchemaType.prototype.$conditionalHandlers,
			$gt: this.cast,
			$gte: this.cast,
			$lt: this.cast,
			$lte: this.cast,
		};
	}

	cast(val: any) {
		// d('Cast:', val);
		if (isNull(val)) return null;
		if (isUndefined(val)) return undefined;
		return makeMoney(val);
	}
}

mongoose.Schema.Types.LocalDate = LocalDate;
mongoose.Schema.Types.Money = Money;
