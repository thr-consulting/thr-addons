// @flow

import yup from 'yup';
import SIN from 'social-insurance-number';
import escapeRegExp from 'escape-string-regexp';

/**
 * Validates email addresses.
 */
export const email = () => yup
	.string()
	.email('Invalid email address')
	.required('Email required')
	.trim()
	.lowercase();

/**
 * Validates a password. Required string, min length 6 chars.
 */
export const password = () => yup
	.string()
	.min(6)
	.required('Password required');

/**
 * Validates a second password.
 * @param passwordField
 */
export const passwordSecond = (passwordField: string) => yup.string().when(passwordField, v => {
	if (!v) return yup.string().required('Please confirm your password');
	return yup.string().matches(new RegExp(`^${escapeRegExp(v)}$`), 'Passwords must match');
});

/**
 * Validates an address object.
 */
export const address = () => yup.object({
	description: yup.string().required('Description required'),
	address1: yup.string().required('Address 1 required'),
	address2: yup.string(),
	city: yup.string(),
	province: yup.string(),
	postalCode: yup.string().matches(/^[A-Z]\d[A-Z] \d[A-Z]\d$|^\d\d\d\d\d$|^\d\d\d\d\d-\d\d\d\d$/, 'Invalid Postal Code'),
});

/**
 * Validates a phone number.
 */
export const phone = () => yup.object({
	description: yup.string().required('Description required'),
	number: yup.string().required().matches(/^(\d\d\d-\d\d\d-\d\d\d\d|\+\d-\d\d\d-\d\d\d-\d\d\d\d)( x\d+)?$/, 'Invalid Phone Number'),
});

/**
 * Validates a Canadian SIN.
 */
export const sin = () => yup.object({
	sin: yup.string().test('is-sin', '${path} is not a valid SIN', value => new SIN(value).isValid()), // eslint-disable-line
});
