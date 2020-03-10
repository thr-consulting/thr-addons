import React from 'react';
import debug from 'debug';
import {ReactDatePickerProps} from 'react-datepicker';
import {LocalDate} from '@js-joda/core';
import {InputProps, Input} from 'semantic-ui-react';
import {toDate, toLocalDate} from '@thx/date';
import {DatePicker} from '../DatePicker/index';

const d = debug('thx.controls.MonthDayPicker');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface MonthDayHeaderProps {
	date: Date;
	changeYear(year: number): void;
	changeMonth(month: number): void;
	decreaseMonth(): void;
	increaseMonth(): void;
	prevMonthButtonDisabled: boolean;
	nextMonthButtonDisabled: boolean;
	decreaseYear(): void;
	increaseYear(): void;
	prevYearButtonDisabled: boolean;
	nextYearButtonDisabled: boolean;
}

function MonthDayHeader(props: MonthDayHeaderProps) {
	return (
		<>
			<div className="react-datepicker__current-month">{months[props.date.getMonth()]}</div>
			<button
				type="button"
				className="react-datepicker__navigation react-datepicker__navigation--previous"
				aria-label="Previous Month"
				onClick={props.decreaseMonth}
				disabled={props.prevMonthButtonDisabled}
			>
				Previous Month
			</button>
			<button
				type="button"
				className="react-datepicker__navigation react-datepicker__navigation--next"
				aria-label="Next Month"
				onClick={props.increaseMonth}
				disabled={props.nextMonthButtonDisabled}
			>
				Next Month
			</button>
		</>
	);
}

interface IMonthDayPickerProps {
	value?: LocalDate | number | null;
	onChange?: (value: LocalDate | null) => void;
	onChangeRaw?: () => void;
}

type InputPropsOmitted = Omit<InputProps, 'onChange'>;
type ReactDatePickerPropsOmitted = Omit<Omit<ReactDatePickerProps, 'value'>, 'onChange'>;
export type MonthDayPickerProps = IMonthDayPickerProps & InputPropsOmitted & ReactDatePickerPropsOmitted;

export function MonthDayPicker(props: MonthDayPickerProps): JSX.Element {
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
			renderCustomHeader={MonthDayHeader}
			dateFormat="MMMM d"
		/>
	);
}
