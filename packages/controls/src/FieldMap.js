// @flow

import React from 'react';

type Props = {
	value: any,
	as: Function,
	asValue: string,
	onChange: Function,
};

/**
 * Maps onChange handler parameters from (event, data) to just (data).
 * @class
 * @property {*} value - The value of the field
 * @property {Component} as - The React Component to render
 * @property {string} asValue
 * @property {onChange} onChange - The normal onChange handler
 */
export default function FieldMap({value, as, asValue, onChange, ...rest}: Props) {
	const props = {
		...rest,
		onChange: (e, data) => onChange(data[asValue]),
	};
	props[asValue] = value;

	return React.createElement(as, props);
}
