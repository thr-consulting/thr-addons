import React, {Component, SyntheticEvent} from 'react';
import {Select} from 'semantic-ui-react';
import {LocalDate} from 'js-joda';
import debug from 'debug';

const d = debug('thx:controls:date:LocalMonthSelect');

const monthOptions = [
	{text: 'January', value: 1, key: 1},
	{text: 'February', value: 2, key: 2},
	{text: 'March', value: 3, key: 3},
	{text: 'April', value: 4, key: 4},
	{text: 'May', value: 5, key: 5},
	{text: 'June', value: 6, key: 6},
	{text: 'July', value: 7, key: 7},
	{text: 'August', value: 8, key: 8},
	{text: 'September', value: 9, key: 9},
	{text: 'October', value: 10, key: 10},
	{text: 'November', value: 11, key: 11},
	{text: 'December', value: 12, key: 12},
];

interface Props {
	name: string,
	onChange?: Function,
	value?: LocalDate,
	year?: number,
	label?: string,
}

/**
 * Month select dropdown
 * @class
 * @property {onChange} onChange - Called when the value changes.
 * @property {Date} value - The value in date form. Day is ignored.
 * @property {number} [year=Current Year] - The year to use when selecting a date.
 */
export default class LocalMonthSelect extends Component<Props> {
	handleChange = (e: SyntheticEvent<HTMLElement>, value) => {
		const year = this.props.year || LocalDate.now().year();
		if (this.props.onChange) {
			this.props.onChange(this.props.name)(value ? LocalDate.of(year, value.value, 1) : null);
		}
	};

	render() {
		const {value, onChange, ...rest} = this.props;

		return (
			<Select
				placeholder="Select Month"
				options={monthOptions}
				value={value ? value.monthValue() : ''}
				onChange={this.handleChange}
				{...rest}
			/>
		);
	}
}
