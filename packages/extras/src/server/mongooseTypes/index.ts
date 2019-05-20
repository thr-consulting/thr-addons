import debug from 'debug';
import {LocalDate as LD} from 'js-joda';
import {makeMoney} from '@thx/money';
import {transformEpochIntegerToLocalDate, transformLocalDateToEpochInteger} from '@thx/date';
import mongoose from 'mongoose';
import isInteger from 'lodash/isInteger';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import './types.d';

const d = debug('app.lib.mongooseTypes');

// Add .toBSON to LocalDate if not defined
// @ts-ignore
if (!LD.prototype.toBSON) {
	// @ts-ignore
	LD.prototype.toBSON = function() {
		d('toBSON', this);
		return transformLocalDateToEpochInteger(this);
	};
}

class LocalDate extends mongoose.SchemaType {
	cast(val: any) {
		d('Cast:', val);
		if (val instanceof LD) return val;
		if (isInteger(val)) return transformEpochIntegerToLocalDate(val);
		if (isNull(val)) return null;
		if (isUndefined(val)) return undefined;

		throw new Error(`SchemaType LocalDate: ${val} is not a LocalDate (or null, undefined)`);
	}
}

class Money extends mongoose.SchemaType {
	cast(val: any) {
		d('Cast:', val);
		if (isNull(val)) return null;
		if (isUndefined(val)) return undefined;
		return makeMoney(val);
	}
}

mongoose.Schema.Types.LocalDate = LocalDate;
mongoose.Schema.Types.Money = Money;
