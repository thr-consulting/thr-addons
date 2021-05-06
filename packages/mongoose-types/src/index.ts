// @ts-nocheck
// eslint-disable-next-line max-classes-per-file
import {LocalDate as LD, LocalTime as LT} from '@js-joda/core';
import {toEpochDay, toLocalDate, toLocalTime} from '@thx/date';
import {toMoney} from '@thx/money';
import debug from 'debug';
import isInteger from 'lodash/isInteger';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import {Schema, SchemaType} from 'mongoose';

const d = debug('thx.mongoose-types');

// Add .toBSON to LocalDate if not defined
if (!LD.prototype.toBSON) {
	LD.prototype.toBSON = function toBSON(this: LD) {
		return toEpochDay(this);
	};
}

// Add .toBSON to LocalTime if not defined
if (!LT.prototype.toBSON) {
	LT.prototype.toBSON = function toBSON(this: LT) {
		return this.toSecondOfDay();
	};
}

class LocalDate extends SchemaType {
	$conditionalHandlers: Record<string, unknown>;

	constructor(...params: any) {
		super(...params);

		this.$conditionalHandlers = {
			// @ts-ignore
			...SchemaType.prototype.$conditionalHandlers,
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

class LocalTime extends SchemaType {
	$conditionalHandlers: Record<string, unknown>;

	constructor(...params: any) {
		super(...params);

		this.$conditionalHandlers = {
			...SchemaType.prototype.$conditionalHandlers,
			$gt: this.cast,
			$gte: this.cast,
			$lt: this.cast,
			$lte: this.cast,
		};
	}

	cast(val: any) {
		// d('Cast:', val);
		if (val instanceof LT) return val;
		if (isInteger(val)) return toLocalTime(val);
		if (isNull(val)) return null;
		if (isUndefined(val)) return undefined;

		throw new Error(`SchemaType LocalTime: ${val} is not a LocalTime (or null, undefined)`);
	}
}

class Money extends SchemaType {
	$conditionalHandlers: Record<string, unknown>;

	constructor(...params: any) {
		super(...params);

		this.$conditionalHandlers = {
			...SchemaType.prototype.$conditionalHandlers,
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

Schema.Types.LocalDate = LocalDate;
Schema.Types.Money = Money;
Schema.Types.LocalTime = LocalTime;

// This is needed to make mongoose work in production.
// it uses the Class.name (with the first letter capitalized) as an index on the Schema.Types
// for the custom types.
function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
Schema.Types[capitalizeFirstLetter(LocalDate.name)] = LocalDate;
Schema.Types[capitalizeFirstLetter(Money.name)] = Money;
Schema.Types[capitalizeFirstLetter(LocalTime.name)] = LocalTime;
