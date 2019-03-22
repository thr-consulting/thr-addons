// @flow

import React from 'react';
import DTPicker from 'react-widgets/lib/DateTimePicker';
import '../styles.css';

type Props = {
	width?: string,
};

/**
 * DateTimePicker from {@link https://jquense.github.io/react-widgets/docs/#/datetime-picker|React Widgets}.
 * @class
 * @property {string} [width=null] - If set to 'auto' the input fills the width.
 * @property {Date} value - The JS Date object
 * @property {onChange} onChange - Called when the value changes.
 */
export default function DateTimePicker(props: Props) {
	let extraClasses;
	if (props.width === 'auto') {
		extraClasses = 'dateTimePickerAutoWidth';
	}
	const aprops = {...props};
	delete aprops.meta;
	return <DTPicker {...aprops} className={extraClasses}/>;
}
