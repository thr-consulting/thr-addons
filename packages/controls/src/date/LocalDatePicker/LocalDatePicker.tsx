import type {LocalDate} from '@js-joda/core';
import {toDate, toLocalDate} from '@thx/date';
import debug from 'debug';
import {DatePicker} from '@mantine/dates';
import type {DatePickerProps} from '@mantine/dates';

const d = debug('thx.controls.date.LocalDatePicker');

interface ILocalDatePicker {
	defaultValue?: LocalDate | number | null;
	initialMonth?: LocalDate | number | null;
	value?: LocalDate | number | null;
	onChange?: (value: LocalDate | null) => void;
	onChangeRaw?: (value: Date | null) => void;
	minDate?: LocalDate;
	maxDate?: LocalDate;
}

export type LocalDatePickerProps = ILocalDatePicker &
	Omit<DatePickerProps, 'onChange' | 'value' | 'defaultValue' | 'initialMonth' | 'minDate' | 'maxDate'>;

export function LocalDatePicker(props: LocalDatePickerProps): JSX.Element {
	const {minDate, maxDate, value, onChange, onChangeRaw, defaultValue, initialMonth, ...rest} = props;

	const selected = value ? toDate(value) : null;

	return (
		<DatePicker
			defaultValue={defaultValue ? toDate(defaultValue) : undefined}
			initialMonth={initialMonth ? toDate(initialMonth) : undefined}
			allowFreeInput
			minDate={minDate ? toDate(minDate) : undefined}
			maxDate={maxDate ? toDate(maxDate) : undefined}
			value={selected}
			onChange={date => {
				if (onChange) onChange(date ? toLocalDate(date) : null);
				if (onChangeRaw) onChangeRaw(date);
			}}
			{...rest}
		/>
	);
}
