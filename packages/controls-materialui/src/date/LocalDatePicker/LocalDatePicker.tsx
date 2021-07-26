import DateFnsUtils from '@date-io/date-fns';
import type {LocalDate} from '@js-joda/core';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import type {KeyboardDatePickerProps} from '@material-ui/pickers';
import {toDate, toLocalDate} from '@thx/date';
import debug from 'debug';
import React from 'react';

const d = debug('thx.controls-materialui.date.LocalDatePicker');

interface ILocalDatePicker {
	value?: LocalDate | number | null;
	onChange?: (value: LocalDate | null) => void;
	minDate?: LocalDate;
	maxDate?: LocalDate;
	dateFormat?: string;
}

export type LocalDatePickerProps = Omit<KeyboardDatePickerProps, 'onChange' | 'minDate' | 'maxDate' | 'value' | 'dateFormat'> & ILocalDatePicker;

export function LocalDatePicker(props: LocalDatePickerProps): JSX.Element {
	const {dateFormat, value, onChange, minDate, maxDate, ...rest} = props;

	const selected = value ? toDate(value) : undefined;

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				variant="inline"
				format={dateFormat || 'MM/dd/yyyy'}
				value={selected}
				onChange={v => {
					if (onChange) {
						if (v) {
							if (!Number.isNaN(v.getDate())) onChange(toLocalDate(v));
						} else {
							onChange(null);
						}
					}
				}}
				maxDate={maxDate ? toDate(maxDate) : undefined}
				minDate={minDate ? toDate(minDate) : undefined}
				{...rest}
			/>
		</MuiPickersUtilsProvider>
	);
}
