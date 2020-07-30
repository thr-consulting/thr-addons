import React from 'react';
import debug from 'debug';
import type {ReactDatePickerProps} from 'react-datepicker';
import type {LocalDate} from '@js-joda/core';
import {toDate, toLocalDate} from '@thx/date';
import {MaskedDateInput, MaskedDateInputProps} from './MaskedDateInput';
import {DatePicker} from '../DatePicker/index';

const d = debug('thx.controls.LocalDatePicker');

export interface LocalDatePickerProps {
	value?: LocalDate | number | null;
	onChange?: (value: LocalDate | null) => void;
	datePicker?: Omit<ReactDatePickerProps, 'selected' | 'onChange'>;
	maskedDateInput?: Omit<MaskedDateInputProps, 'value' | 'onChange'>;
}

export function LocalDatePicker(props: LocalDatePickerProps) {
	const {value, onChange, datePicker, maskedDateInput} = props;

	const selected = value ? toDate(value) : null;

	return (
		<DatePicker
			{...datePicker}
			selected={selected}
			onChange={date => {
				d(`DatePicker onChange: ${date}`);
				if (onChange) onChange(date ? toLocalDate(date) : null);
			}}
			customInput={<MaskedDateInput {...maskedDateInput} />}
		/>
	);
}
