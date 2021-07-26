import type {LocalDate} from '@js-joda/core';
import {toDate, toLocalDate} from '@thx/date';
import {DatePicker, DatePickerInput} from 'carbon-components-react';
import type {DatePickerProps} from 'carbon-components-react';
import debug from 'debug';
import React from 'react';

const d = debug('thx.controls-carbon.date.LocalDatePicker');

interface ILocalDatePicker {
	value?: LocalDate | number | null;
	onChange?: (value: LocalDate | null) => void;
	onChangeRaw?: () => void;
	minDate?: LocalDate;
	maxDate?: LocalDate;
	dateFormat?: string;
}

export type LocalDatePickerProps = Omit<DatePickerProps, 'onChange' | 'minDate' | 'maxDate' | 'value' | 'formatDate'> & ILocalDatePicker;

export function LocalDatePicker(props: LocalDatePickerProps): JSX.Element {
	const {minDate, maxDate, value, onChange, dateFormat, ...rest} = props;

	const selected = value ? toDate(value) : undefined;

	return (
		<DatePicker
			dateFormat={dateFormat || 'm/d/Y'}
			datePickerType="single"
			onChange={dates => {
				if (onChange) onChange(dates.length === 0 ? null : toLocalDate(dates[0]));
			}}
			value={selected}
			maxDate={maxDate ? toDate(maxDate) : undefined}
			minDate={minDate ? toDate(minDate) : undefined}
			{...rest}
		>
			<DatePickerInput id="date-picker-id" placeholder="mm/dd/yyy" labelText="Date picker" type="text" />
		</DatePicker>
	);
}
