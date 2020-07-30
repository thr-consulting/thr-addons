import React from 'react';
import debug from 'debug';
import type {ReactDatePickerProps} from 'react-datepicker';
import {LocalTime} from '@js-joda/core';
import {toDate, toLocalTime} from '@thx/date';
import {MaskedTimeInput} from './MaskedTimeInput';
import type {MaskedTimeInputProps} from './MaskedTimeInput';
import {DatePicker} from '../DatePicker/index';

const d = debug('thx.controls.LocalTimePicker');

export interface LocalTimePickerProps {
	value?: LocalTime | number | null;
	onChange?: (value: LocalTime | null) => void;
	datePicker?: Omit<ReactDatePickerProps, 'onChange' | 'selected'>;
	maskedTimeInput?: Omit<MaskedTimeInputProps, 'value' | 'onChange' | 'dateFormat'>;
}

export function LocalTimePicker(props: LocalTimePickerProps) {
	const {value, onChange, datePicker, maskedTimeInput} = props;

	let selected;
	if (typeof value === 'number') selected = toDate(LocalTime.ofSecondOfDay(value));
	else selected = value ? toDate(value) : null;

	return (
		<DatePicker
			{...datePicker}
			selected={selected}
			onChange={date => {
				if (onChange) onChange(date ? toLocalTime(date) : null);
			}}
			showTimeSelect={datePicker?.showTimeSelect === undefined ? true : datePicker.showTimeSelect}
			showTimeSelectOnly={datePicker?.showTimeSelectOnly === undefined ? true : datePicker.showTimeSelectOnly}
			timeIntervals={datePicker?.timeIntervals === undefined ? 15 : datePicker.timeIntervals}
			timeCaption={datePicker?.timeCaption === undefined ? 'Time' : datePicker.timeCaption}
			dateFormat="hh:mm aa"
			customInput={<MaskedTimeInput {...maskedTimeInput} />}
		/>
	);
}
