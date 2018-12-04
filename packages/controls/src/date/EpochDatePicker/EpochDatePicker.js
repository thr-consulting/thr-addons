// @flow

import React, {Component} from 'react';
import DTPicker from 'react-widgets/lib/DateTimePicker';
import omit from 'lodash/omit';
import {LocalDate} from 'js-joda';
import {transformEpochIntegerToDate, transformDateToEpochInteger} from '@thx/date';

type Props = {
	width?: string,
	value?: number,
	defaultValue?: number,
	onChange?: Function,
	onSelect?: Function,
	min?: LocalDate,
	max?: LocalDate,
	currentDate?: number,
	defaultCurrentDate?: number,
	onCurrentDateChange?: Function,
};

/**
 * Let's you pick an epoch integer. No time parts are recorded.
 * @class
 * @property width
 * @property value
 * @property defaultValue
 * @property onChange
 * @property onSelect
 * @property min
 * @property max
 * @property currentDate
 * @property defaultCurrentDate
 * @property onCurrentDateChange
 */
export default class EpochDatePicker extends Component<Props> {
	handleChange = (date: Date) => {
		if (this.props.onChange) this.props.onChange(date ? transformDateToEpochInteger(date) : null);
	};

	handleSelect = (date: Date) => {
		if (this.props.onSelect) this.props.onSelect(date ? transformDateToEpochInteger(date) : null);
	};

	handleCurrentDateChange = (date: Date) => {
		if (this.props.onCurrentDateChange) this.props.onCurrentDateChange(date ? transformDateToEpochInteger(date) : null);
	};


	render() {
		const {
			value,
			defaultValue,
			width,
			min,
			max,
			currentDate,
			defaultCurrentDate,
			onCurrentDateChange,
			onChange,
			onSelect,
			...rest
		} = this.props;

		let extraClasses;
		if (width === 'auto') {
			extraClasses = 'dateTimePickerAutoWidth';
		}

		const edpValue = value ? transformEpochIntegerToDate(value) : null;
		const edpDefaultValue = defaultValue ? transformEpochIntegerToDate(value) : null;
		const edpMin = min ? transformEpochIntegerToDate(min) : null;
		const edpMax = max ? transformEpochIntegerToDate(max) : null;
		const edpCurrentDate = currentDate ? transformEpochIntegerToDate(currentDate) : null;
		const edpDefaultCurrentDate = currentDate ? transformEpochIntegerToDate(defaultCurrentDate) : null;

		const newProps = {};
		if (edpValue) newProps.value = edpValue;
		if (edpDefaultValue) newProps.defaultValue = edpDefaultValue;
		if (edpMin) newProps.min = edpMin;
		if (edpMax) newProps.max = edpMax;
		if (edpCurrentDate) newProps.currentDate = edpCurrentDate;
		if (edpDefaultCurrentDate) newProps.defaultCurrentDate = edpDefaultCurrentDate;
		if (onCurrentDateChange) newProps.onCurrentDateChange = this.handleCurrentDateChange;
		if (onChange) newProps.onChange = this.handleChange;
		if (onSelect) newProps.onSelect = this.handleSelect;

		return (
			<DTPicker
				{...newProps}
				time={false}
				className={extraClasses}
				{...omit(rest, ['time'])}
			/>
		);
	}
}
