// @flow

import {address, email, password, passwordSecond, phone, sin} from './user';
import {localDateNumber, localDate, moment} from './date';
import {money} from './money';
import schemaValidate from './schemaValidate';

export default {
	email,
	password,
	passwordSecond,
	address,
	phone,
	sin,
	moment,
	money,
	localDateNumber,
	localDate,
	schemaValidate,
};

/**
 * Generic Yup Schema
 * @typedef {Object} YupSchema
 */
