// eslint-disable-next-line max-classes-per-file
import debug from 'debug';
import {LocalDate as LD} from '@js-joda/core';
import {toMoney} from '@thx/money';
import {toEpochDay, toLocalDate} from '@thx/date';
import mongoose from 'mongoose';
import isInteger from 'lodash/isInteger';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';

const d = debug('thx.mongoose-types');

function toBSON(this: any): number {
	return toEpochDay(this);
}

// Add .toBSON to LocalDate if not defined
// @ts-ignore
if (!LD.prototype.toBSON) {
	// @ts-ignore
	LD.prototype.toBSON = toBSON;
}

class LocalDate extends mongoose.SchemaType {
	$conditionalHandlers: object;

	constructor(...params: any) {
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
		if (isInteger(val)) return toLocalDate(val);
		if (isNull(val)) return null;
		if (isUndefined(val)) return undefined;

		throw new Error(`SchemaType LocalDate: ${val} is not a LocalDate (or null, undefined)`);
	}
}

class Money extends mongoose.SchemaType {
	$conditionalHandlers: object;

	constructor(...params: any) {
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
		return toMoney(val);
	}
}

// @ts-ignore
mongoose.Schema.Types.LocalDate = LocalDate;
// @ts-ignore
mongoose.Schema.Types.Money = Money;
