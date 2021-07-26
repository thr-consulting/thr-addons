import {DatePicker} from '@fluentui/react';
import type {IDatePickerProps} from '@fluentui/react';
import type {LocalDate} from '@js-joda/core';
import {toDate, toLocalDate, formatDate as thxFormatDate} from '@thx/date';
import debug from 'debug';
import React from 'react';

const d = debug('thx.controls-fluentui.date.LocalDatePicker');

interface ILocalDatePicker {
	value?: LocalDate | number | null;
	onChange?: (value: LocalDate | null) => void;
	onChangeRaw?: () => void;
	minDate?: LocalDate;
	maxDate?: LocalDate;
	formatDate?: (date: LocalDate) => string;
}

export type LocalDatePickerProps = Omit<IDatePickerProps, 'onChange' | 'minDate' | 'maxDate' | 'value' | 'formatDate'> & ILocalDatePicker;

export function LocalDatePicker(props: LocalDatePickerProps): JSX.Element {
	const {minDate, maxDate, value, onChange, formatDate, ...rest} = props;

	const selected = value ? toDate(value) : undefined;

	return (
		<DatePicker
			allowTextInput
			value={selected}
			onSelectDate={date => {
				if (onChange) onChange(date ? toLocalDate(date) : null);
			}}
			maxDate={maxDate ? toDate(maxDate) : undefined}
			minDate={minDate ? toDate(minDate) : undefined}
			formatDate={date => {
				if (formatDate) return formatDate(toLocalDate(date));
				return thxFormatDate(date);
			}}
			{...rest}
		/>
	);
}
