/* eslint-disable react/prop-types */
// @flow

import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import {LocalDate} from 'js-joda';
import moment from 'moment';
import {transformMomentToLocalDate, transformLocalDateToMoment} from '@thx/date';
import MaskedInput from '../../inputs/MaskedInput';

type Props = {
	value?: LocalDate,
	onChange?: LocalDate => void,
	onChangeRaw?: () => void,
};

/**
 * Let's you pick a LocalDate. No time parts are recorded.
 * @class
 * @property value
 * @property onChange
 */
export default class DatePickerLocalDate extends Component<Props> {
	constructor(props) {
		super(props);

		this._dateFormat = moment().localeData().longDateFormat('L');
		this._mask = this._dateFormat.replace(/[^\\\-/.]/g, '9');
	}

	handleChange = (momentValue?: Moment) => {
		if (this.props.onChange) this.props.onChange(transformMomentToLocalDate(momentValue));
	};

	handleRawChange = data => {
		this.handleChange(data ? moment(data, this._dateFormat) : null);
		if (this.props.onChangeRaw) this.props.onChangeRaw(data);
	};

	props: Props;

	render() {
		const {
			value,
			onChange,
			onChangeRaw,

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
		newProps.selected = transformLocalDateToMoment(value);
		if (onChange) newProps.onChange = this.handleChange;
		newProps.onChangeRaw = this.handleRawChange;

		const inputProps = {
			action, actionPosition, as, disabled, error, fluid, focus, icon, iconPosition, inverted, label, labelPosition, loading, size, transparent,
		};

		return (
			<DatePicker
				customInput={<MaskedInput {...inputProps} mask={{mask: this._mask}}/>}
				{...newProps}
			/>
		);
	}
}
