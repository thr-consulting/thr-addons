import React from 'react';
import debug from 'debug';
import type {ReactDatePickerProps} from 'react-datepicker';
import type {LocalDate} from '@js-joda/core';
import {InputProps, Input} from 'semantic-ui-react';
import {toDate, toLocalDate} from '@thx/date';
import {DatePicker} from '../DatePicker/index';

const d = debug('thx.controls.MonthYearPicker');

interface IMonthYearPickerProps {
	value?: LocalDate | number | null;
	onChange?: (value: LocalDate | null) => void;
	onChangeRaw?: () => void;
}

type InputPropsOmitted = Omit<InputProps, 'onChange'>;
type ReactDatePickerPropsOmitted = Omit<Omit<ReactDatePickerProps, 'value'>, 'onChange'>;
export type MonthYearPickerProps = IMonthYearPickerProps & InputPropsOmitted & ReactDatePickerPropsOmitted;

export function MonthYearPicker(props: MonthYearPickerProps): JSX.Element {
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
				if (onChange) onChange(date ? toLocalDate(date) : null);
			}}
			customInput={<Input {...inputProps} />}
			dateFormat="MMMM yyyy"
			showMonthYearPicker
		/>
	);
}
