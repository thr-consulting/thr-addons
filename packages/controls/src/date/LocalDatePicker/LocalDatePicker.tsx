import type {LocalDate} from '@js-joda/core';
import {toDate, toLocalDate} from '@thx/date';
import debug from 'debug';
import {useState} from 'react';
import type {ReactDatePickerProps} from 'react-datepicker';
import {Icon, Input, InputProps} from 'semantic-ui-react';
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
	icon?: boolean;
	openOnFocus?: boolean;
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
		icon = true,
		iconPosition,
		inverted,
		label,
		labelPosition,
		loading,
		size,
		tabIndex,
		transparent,
		openOnFocus = false,
		...rest
	} = props;

	const inputProps = {
		as,
		action,
		actionPosition,
		className: `${className || ''} icon`,
		error,
		focus,
		fluid,
		inverted,
		label,
		labelPosition,
		loading,
		size,
		tabIndex,
		transparent,
	};

	const maskedInputProps = {
		as,
		action,
		actionPosition,
		className,
		error,
		focus,
		inverted,
		label,
		labelPosition,
		loading,
		size,
		tabIndex,
		transparent,
	};

	const iconProps = {
		className,
		inverted,
		loading,
		size,
		transparent,
		iconPosition,
	};

	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState(value ? toDate(value) : null);

	const handleDateChange = (date: Date) => {
		setSelected(date);
		onChange && onChange(date ? toLocalDate(date) : null);
		setIsOpen(false);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		const date = inputValue ? toDate(inputValue) : null;
		setSelected(date);
		onChange && onChange(date ? toLocalDate(date) : null);
	};

	const handleDatePickerBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsOpen(false);
		onBlur && onBlur(e);
	};

	const toggleDatePicker = () => {
		setIsOpen(!isOpen);
	};

	const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// toggle on enter
		e?.key === 'Enter' && toggleDatePicker();
		// hide on escape
		e?.key === 'Escape' && setIsOpen(false);
	};

	return (
		<DatePicker
			{...rest}
			selected={selected}
			onChange={handleDateChange}
			customInput={
				<Input {...inputProps}>
					<MaskedDateInput
						{...maskedInputProps}
						value={selected ? toDate(selected) : ''}
						onChange={handleInputChange}
						onClick={({target}: {target: HTMLInputElement}) => (openOnFocus ? setIsOpen(!isOpen) : target.select())}
						onKeyDown={handleOnKeyDown}
					/>
					{icon && <Icon {...iconProps} onClick={toggleDatePicker} tabIndex={-1} name="calendar alternate" link />}
				</Input>
			}
			minDate={minDate ? toDate(minDate) : null}
			maxDate={maxDate ? toDate(maxDate) : null}
			open={isOpen}
			enableTabLoop={openOnFocus}
			preventOpenOnFocus={openOnFocus}
			onBlur={handleDatePickerBlur}
		/>
	);
}
