import React from 'react';
import debug from 'debug';
import {ReactDatePickerProps} from 'react-datepicker';
import {LocalTime} from '@js-joda/core';
import {InputProps} from 'semantic-ui-react';
import {toDate, toLocalTime} from '@thx/date';
import {MaskedTimeInput} from './MaskedTimeInput';
import {DatePicker} from '../DatePicker/index';

const d = debug('thx.controls.LocalTimePicker');

interface ILocalTimePicker {
	value?: LocalTime | number | null;
	onChange?: (value: LocalTime | null) => void;
	onChangeRaw?: () => void;
}

type InputPropsOmitted = Omit<InputProps, 'onChange'>;
type ReactDatePickerPropsOmitted = Omit<Omit<ReactDatePickerProps, 'value'>, 'onChange'>;
export type LocalTimePickerProps = ILocalTimePicker & InputPropsOmitted & ReactDatePickerPropsOmitted;

export function LocalTimePicker(props: LocalTimePickerProps): JSX.Element {
	const {
		value,
		onChange,
		as,
		action,
		actionPosition,
		className,
		disabled,
		error,
		fluid,
		focus,
		icon,
		iconPosition,
		inverted,
		label,
		labelPosition,
		loading,
		size,
		tabIndex,
		transparent,
		...rest
	} = props;

	const selected = value ? toDate(value) : null;

	const inputProps = {
		as,
		action,
		actionPosition,
		className,
		disabled,
		error,
		fluid,
		focus,
		icon,
		iconPosition,
		inverted,
		label,
		labelPosition,
		loading,
		size,
		tabIndex,
		transparent,
	};

	return (
		<DatePicker
			{...rest}
			selected={selected}
			onChange={date => {
				if (onChange) onChange(date ? toLocalTime(date) : null);
			}}
			showTimeSelect
			showTimeSelectOnly
			timeIntervals={15}
			timeCaption="Time"
			dateFormat="hh:mm aa"
			// @ts-ignore
			customInput={<MaskedTimeInput {...inputProps} />}
		/>
	);
}
