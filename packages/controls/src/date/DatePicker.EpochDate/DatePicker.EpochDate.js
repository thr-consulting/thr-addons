/* eslint-disable react/prop-types */
// @flow

import React, {Component} from 'react';
import {transformLocalDateToEpochInteger, transformEpochIntegerToLocalDate} from '@thx/date';
import {LocalDate} from 'js-joda';
import DatePickerLocalDate from '../DatePicker.LocalDate';

type Props = {
	value?: number,
	onChange?: number => void,
};

/**
 * Let's you pick a LocalDate. No time parts are recorded.
 * @class
 * @property value
 * @property onChange
 */
export default class DatePickerEpochDate extends Component<Props> {
	handleChange = (localDate: LocalDate) => {
		if (this.props.onChange) this.props.onChange(transformLocalDateToEpochInteger(localDate));
	};

	render() {
		const {
			value,
			onChange,
			...rest
		} = this.props;

		const newProps = {...rest};
		newProps.value = transformEpochIntegerToLocalDate(value);
		if (onChange) newProps.onChange = this.handleChange;

		return (
			<DatePickerLocalDate {...newProps}/>
		);
	}
}
