// @flow

import yup, {mixed} from 'yup';
import momentjs from 'moment';
import {LocalDate} from 'js-joda';
import isNull from 'lodash/isNull';

/**
 * Validates a Moment.
 */
class MomentSchema extends mixed {
	constructor() {
		super({type: 'momentschema'});

		this.transforms.push(value => {
			if (this.isType(value)) return value;

			const val = momentjs(value);
			return val.isValid() ? val : momentjs.invalid();
		});
	}

	_typeCheck(v: Object) {
		return momentjs.isMoment(v) && v.isValid();
	}
}
export const moment = () => new MomentSchema();

/**
 * Validates a LocalDateNumber
 */
export const localDateNumber = () => yup.number();

/**
 * Validates a LocalDate
 */
class LocalDateSchema extends mixed {
	constructor() {
		super({type: 'localdateschema'});

		this.transforms.push(value => {
			if (this.isType(value)) return value;

			if (isNull(value)) return null;
			if (value._year && value._month && value._day) { // eslint-disable-line no-underscore-dangle
				return LocalDate.of(value._year, value._month, value._day); // eslint-disable-line no-underscore-dangle
			}
			return null;
		});
	}

	_typeCheck(v: Object) {
		return v instanceof LocalDate;
	}
}
export const localDate = () => new LocalDateSchema();
