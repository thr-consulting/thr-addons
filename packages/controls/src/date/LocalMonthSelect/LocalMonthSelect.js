// @flow

import React, {Component} from 'react';
import {Select} from 'semantic-ui-react';
import {LocalDate} from 'js-joda';
import debug from 'debug';

const d = debug('thx:controls:date:LocalMonthSelect');

const monthOptions = [
	{text: 'January', value: 1},
	{text: 'February', value: 2},
	{text: 'March', value: 3},
	{text: 'April', value: 4},
	{text: 'May', value: 5},
	{text: 'June', value: 6},
	{text: 'July', value: 7},
	{text: 'August', value: 8},
	{text: 'September', value: 9},
	{text: 'October', value: 10},
	{text: 'November', value: 11},
	{text: 'December', value: 12},
];

type Props = {
	onChange?: Function,
	value?: LocalDate,
	year?: number,
};

type ValueOption = {
	text: string,
	value: number,
};

/**
 * Month select dropdown
 * @class
 * @property {onChange} onChange - Called when the value changes.
 * @property {Date} value - The value in date form. Day is ignored.
 * @property {number} [year=Current Year] - The year to use when selecting a date.
 */
export default class LocalMonthSelect extends Component<Props> {
	static defaultProps = {
		year: LocalDate.now().year(),
	};

	handleChange = (e: SyntheticEvent<*>, value: ValueOption) => {
		d('Month changed to:', value.value, e);
		if (this.props.onChange) {
			if (value !== '') {
				// $FlowFixMe
				this.props.onChange(LocalDate.of(this.props.year, parseInt(value.value, 10), 1));
			} else {
				this.props.onChange(null);
			}
		}
	};

	props: Props;

	render() {
		const {value} = this.props;

		return (
			<Select placeholder="Select Month" options={monthOptions} value={value ? value.monthValue() : ''} onChange={this.handleChange}/>
		);
	}
}
