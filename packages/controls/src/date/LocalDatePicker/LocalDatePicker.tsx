import React from 'react';
import debug from 'debug';
import type {ReactDatePickerProps} from 'react-datepicker';
import type {LocalDate} from '@js-joda/core';
import type {InputProps} from 'semantic-ui-react';
import {toDate, toLocalDate} from '@thx/date';
import {MaskedDateInput} from './MaskedDateInput';
import {DatePicker} from '../DatePicker/index';

const d = debug('thx.controls.LocalDatePicker');

interface ILocalDatePicker {
	value?: LocalDate | number | null;
	onChange?: (value: LocalDate | null) => void;
	onChangeRaw?: () => void;
}

type InputPropsOmitted = Omit<InputProps, 'onChange'>;
type ReactDatePickerPropsOmitted = Omit<Omit<ReactDatePickerProps, 'value'>, 'onChange'>;
export type LocalDatePickerProps = ILocalDatePicker & InputPropsOmitted & ReactDatePickerPropsOmitted;

export function LocalDatePicker(props: LocalDatePickerProps): JSX.Element {
	const {
		value,
		onChange,
		onBlur,
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
			onChange={(date) => {
				if (onChange) onChange(date ? toLocalDate(date) : null);
			}}
			onBlur={onBlur}
			// @ts-ignore
			customInput={<MaskedDateInput {...inputProps} onBlur={onBlur} />}
		/>
	);
}
