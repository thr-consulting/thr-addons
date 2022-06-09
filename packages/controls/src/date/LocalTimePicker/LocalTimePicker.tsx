import {LocalTime} from '@js-joda/core';
import {toDate, toLocalTime} from '@thx/date';
import debug from 'debug';
import {TimeInput} from '@mantine/dates';
import type {TimeInputProps} from '@mantine/dates';

const d = debug('thx.controls.date.LocalTimePicker');

interface ILocalTimePicker {
	value?: LocalTime | number | null;
	onChange?: (value: LocalTime | null) => void;
}

export type LocalTimePickerProps = ILocalTimePicker & Omit<TimeInputProps, 'onChange' | 'value'>;

export function LocalTimePicker(props: LocalTimePickerProps): JSX.Element {
	const {value, onChange, ...rest} = props;

	let selected: Date | null;
	if (typeof value === 'number') selected = toDate(LocalTime.ofSecondOfDay(value));
	else selected = value ? toDate(value) : null;

	return (
		<TimeInput
			value={selected}
			onChange={date => {
				if (onChange) onChange(date ? toLocalTime(date) : null);
			}}
			format="12"
			{...rest}
		/>
	);
}
