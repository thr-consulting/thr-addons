import type {LocalDate} from '@js-joda/core';
import {toDate, toLocalDate} from '@thx/date';
import debug from 'debug';
import {useState} from 'react';
import type {ReactDatePickerProps} from 'react-datepicker';
import {Button, InputProps} from 'semantic-ui-react';
import {DatePicker} from '../DatePicker/index';
import '../DatePicker/styles.css';
import {MaskedDateInput} from './MaskedDateInput';

const d = debug('thx.controls.date.LocalDatePicker');

interface ILocalDatePicker {
	value?: LocalDate | number | null;
	onChange?: (value: LocalDate | null) => void;
	onChangeRaw?: () => void;
	minDate?: LocalDate;
	maxDate?: LocalDate;
	showIcon?: boolean;
}

type InputPropsOmitted = Omit<InputProps, 'onChange'>;
type ReactDatePickerPropsOmitted = Omit<Omit<ReactDatePickerProps, 'value'>, 'onChange' | 'minDate' | 'maxDate'>;
export type LocalDatePickerProps = ILocalDatePicker & InputPropsOmitted & ReactDatePickerPropsOmitted;

export function LocalDatePicker(props: LocalDatePickerProps): JSX.Element {
	const {
		minDate,
		maxDate,
		value,
		onChange,
		onBlur,
		as,
		action,
		actionPosition,
		className,
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
		showIcon,
		...rest
	} = props;

	const inputProps = {
		as,
		action,
		actionPosition,
		className,
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

	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState(value ? toDate(value) : null);

	const handleDateChange = (date: Date) => {
		setSelected(date);
		if (onChange) {
			onChange(date ? toLocalDate(date) : null);
		}
		setIsOpen(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		const date = inputValue ? toDate(inputValue) : null;
		setSelected(date);
		if (onChange) {
			onChange(date ? toLocalDate(date) : null);
		}
	};

	const handleDatePickerBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsOpen(false);
		if (onBlur) {
			onBlur(e);
		}
	};

	return (
		<DatePicker
			{...rest}
			selected={selected}
			onChange={handleDateChange}
			customInput={
				<>
					<MaskedDateInput
						value={selected ? toDate(selected) : ''}
						onChange={handleInputChange}
						onClick={({target}: {target: HTMLInputElement}) => (showIcon ? target.select() : setIsOpen(!isOpen))}
						{...inputProps}
					/>
					{showIcon && <Button attached="right" basic onClick={() => setIsOpen(!isOpen)} tabIndex={-1} icon="calendar alternate" />}
				</>
			}
			minDate={minDate ? toDate(minDate) : null}
			maxDate={maxDate ? toDate(maxDate) : null}
			open={isOpen}
			disabledKeyboardNavigation
			onBlur={handleDatePickerBlur}
		/>
	);
}
