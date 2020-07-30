import React from 'react';
import debug from 'debug';
import type {ReactDatePickerProps} from 'react-datepicker';
import type {LocalDate} from '@js-joda/core';
import {InputProps, Input} from '@fluentui/react-northstar';
import {toDate, toLocalDate} from '@thx/date';
import {DatePicker} from '../DatePicker/index';

const d = debug('thx.controls.MonthYearPicker');

export interface MonthYearPickerProps {
	value?: LocalDate | number | null;
	onChange?: (value: LocalDate | null) => void;
	datePicker?: Omit<ReactDatePickerProps, 'selected' | 'onChange' | 'dateFormat' | 'showMonthYearPicker' | 'customInput'>;
	input?: Omit<InputProps, 'value' | 'onChange'>;
}

export function MonthYearPicker(props: MonthYearPickerProps): JSX.Element {
	const {value, onChange, datePicker, input} = props;

	const selected = value ? toDate(value) : null;

	return (
		<DatePicker
			{...datePicker}
			selected={selected}
			onChange={(date) => {
				if (onChange) onChange(date ? toLocalDate(date) : null);
			}}
			customInput={<Input {...input} />}
			dateFormat="MMMM yyyy"
			showMonthYearPicker
			minDate={toDate(minDate || LocalDate.ofEpochDay(0))}
			maxDate={toDate(maxDate || LocalDate.now().plusYears(20))}
		/>
	);
}
