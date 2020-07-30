import React from 'react';
import debug from 'debug';
import type {ReactDatePickerProps} from 'react-datepicker';
import type {LocalDate} from '@js-joda/core';
import {Input} from '@fluentui/react-northstar';
import type {InputProps} from '@fluentui/react-northstar';
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

export interface MonthDayPickerProps {
	value?: LocalDate | number | null;
	onChange?: (value: LocalDate | null) => void;
	input?: Omit<InputProps, 'value' | 'onChange'>;
	datePicker?: Omit<ReactDatePickerProps, 'selected' | 'onChange' | 'dateFormat' | 'renderCustomHeader' | 'customInput'>;
}

export function MonthDayPicker(props: MonthDayPickerProps): JSX.Element {
	const {value, onChange, input, datePicker} = props;

	const selected = value ? toDate(value) : null;

	return (
		<DatePicker
			{...datePicker}
			selected={selected}
			onChange={date => {
				if (onChange) onChange(date ? toLocalDate(date) : null);
			}}
			customInput={<Input {...input} />}
			renderCustomHeader={MonthDayHeader}
			dateFormat="MMMM d"
		/>
	);
}
