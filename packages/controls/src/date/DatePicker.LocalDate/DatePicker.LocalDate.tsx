import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import {LocalDate} from 'js-joda';
import isNumber from 'lodash/isNumber';
import {transformLocalDateToDate, transformDateToLocalDate} from '@thx/date';
import MaskedInput from '../../inputs/MaskedInput';

interface Props {
	value?: LocalDate,
	onChange?: (LocalDate) => void,
	onChangeRaw?: () => void,
}

/**
 * Let's you pick a LocalDate. No time parts are recorded.
 * @class
 * @property {LocalDate|number} value
 * @property onChange
 */
export default class DatePickerLocalDate extends Component<Props> {
	handleChange = (dateValue?: Date) => {
		// console.log('change', transformDateToLocalDate(dateValue));
		if (this.props.onChange) this.props.onChange(transformDateToLocalDate(dateValue));
	};

	render() {
		const {
			value,
			onChange,
			action,
			actionPosition,
			as,
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
			transparent,
			...rest
		} = this.props;

		const newProps = {...rest};

		// Accept value prop
		if (!value) {
			newProps.selected = null;
		} else if (isNumber(value)) {
			newProps.selected = transformLocalDateToDate(LocalDate.ofEpochDay(value));
		} else if (value instanceof LocalDate) {
			newProps.selected = transformLocalDateToDate(value);
		} else {
			throw new Error('Value must be null, epoch integer or a LocalDate');
		}

		if (onChange) newProps.onChange = this.handleChange;

		const inputProps = {
			action, actionPosition, as, disabled, error, fluid, focus, icon, iconPosition, inverted, label, labelPosition, loading, size, transparent,
		};

		return (
			<DatePicker
				customInput={<MaskedInput {...inputProps} mask={{mask: '99/99/9999'}}/>}
				{...newProps}
			/>
		);
	}
}
