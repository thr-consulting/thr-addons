import {LocalTime} from '@js-joda/core';
import {toDate, toLocalTime} from '@thx/date';
import debug from 'debug';
import {type ReactElement} from 'react';
import type {ReactDatePickerProps} from 'react-datepicker';
import {Input, type InputProps} from 'semantic-ui-react';
import {DatePicker} from '../DatePicker/index';
import {MaskedTimeInput} from './MaskedTimeInput';

const d = debug('thx.controls.date.LocalTimePicker');

interface ILocalTimePicker {
	value?: LocalTime | number | null;
	onChange?: (value: LocalTime | null) => void;
	onChangeRaw?: () => void;
}

type InputPropsOmitted = Omit<InputProps, 'onChange'>;
type ReactDatePickerPropsOmitted = Omit<Omit<ReactDatePickerProps, 'value'>, 'onChange'>;
export type LocalTimePickerProps = ILocalTimePicker & InputPropsOmitted & ReactDatePickerPropsOmitted;

export function LocalTimePicker(props: LocalTimePickerProps): ReactElement {
	const {
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
		inverted,
		label,
		labelPosition,
		loading,
		size,
		tabIndex,
		transparent,
		startFocused,
		startSelected,
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

	let selected;
	if (typeof value === 'number') selected = toDate(LocalTime.ofSecondOfDay(value));
	else selected = value ? toDate(value) : null;

	const handleDatePickerBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		onBlur && onBlur(e);
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
			customInput={
				<Input {...inputProps}>
					<MaskedTimeInput {...maskedInputProps} onBlur={handleDatePickerBlur} />
				</Input>
			}
			onBlur={handleDatePickerBlur}
		/>
	);
}
