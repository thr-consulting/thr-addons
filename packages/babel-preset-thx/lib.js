/* eslint-disable no-param-reassign */

const validateBoolOption = (name, value, defaultValue) => {
	if (typeof value === 'undefined') {
		value = defaultValue;
	}
	if (typeof value !== 'boolean') {
		throw new Error(`Preset imperium: '${name}' option must be a boolean.`);
	}
	return value;
};

const validateStringOption = (name, value, defaultValue) => {
	if (typeof value === 'undefined') {
		value = defaultValue;
	}
	if (typeof value !== 'string' && typeof value !== 'undefined') {
		throw new Error(`Preset imperium: '${name} option must be a string.`);
	}
	return value;
};

const validateObjectOption = (name, value, defaultValue) => {
	if (typeof value === 'undefined' || value === null) {
		return defaultValue;
	}
	if (typeof value === 'object') {
		return value;
	}
	throw new Error(`Preset imperium: '${name}' option must be an object.`);
};

module.exports = {
	validateBoolOption,
	validateStringOption,
	validateObjectOption,
};
