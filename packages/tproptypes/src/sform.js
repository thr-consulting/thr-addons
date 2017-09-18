// @flow

import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import keys from 'lodash/keys';
import some from 'lodash/some';
import every from 'lodash/every';

function invalidProp(propName, componentName, expected) {
	return new Error(`Invalid prop \`${propName.toString()}\` supplied to \`${componentName.toString()}\`, expected ${expected.toString()}.`);
}

/**
 * SField error messages
 * @param {object} props
 * @param {string} propName
 * @param {string} componentName
 * @returns {*}
 */
export const sFieldMessages = (props: Object, propName: String, componentName: String) => {
	const prop = props[propName];
	let isOk = isObject(prop);
	if (keys(prop).length > 0) {
		isOk = isOk && some(keys(prop), key => {
			if (!isArray(prop[key])) return false;
			return every(prop[key], value => (isString(value.message) && isObject(value.values)));
		});
	}
	if (!isOk) return invalidProp(propName, componentName, String('react-input-message.connectToMessageContainer messages'));
	return null;
};
