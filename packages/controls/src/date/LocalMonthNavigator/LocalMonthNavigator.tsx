import React from 'react';
import {Icon, Button, Dropdown, Input} from 'semantic-ui-react';
import debug from 'debug';
import {months} from 'moment';
import {LocalDate} from 'js-joda';

const d = debug('thx.controls.date.LocalMonthNavigator');

interface Props {
	name: string,
	onChange?: Function,
	handleBlur? : Function,
	value?: LocalDate,
	minDate?: LocalDate,
	maxDate?: LocalDate,
	fieldError? : () => boolean,
}

export default function LocalMonthNavigator(props: Props): JSX.Element {
	const {value, onChange = () => {}, name, fieldError, maxDate, minDate, ...rest} = props;
	const error = fieldError ? fieldError() : false;
	const date = value || LocalDate.now();
	const maximumDate = maxDate || LocalDate.now();
	const minimumDate = minDate || LocalDate.ofEpochDay(0);

	const createDropdownOptions = () => {
		if (date.year() >= maximumDate.year()) {
			return months().reduce(
				(acc: {}[], month, index) => {
					if (maximumDate.monthValue() > index) acc.push({value: index + 1, text: month, key: index + 1});
					return acc;
				}, []
			);
		}
		if (date.year() <= minimumDate.year()) {
			return months().reduce(
				(acc: {}[], month, index) => {
					if (index + 1 >= minimumDate.monthValue()) acc.push({value: index + 1, text: month, key: index + 1});
					return acc;
				}, []
			);
		}
		return months().map((val, index) => ({value: index + 1, text: val, key: index + 1}));
	};

	const handleChange = (val: LocalDate) => (onChange.name === 'handleChange' ? onChange(`${name}`)(val) : onChange(val));

	return (
		<Input {...rest}>
			<Button
				basic
				icon
				color={error ? 'red' : 'green'}
				disabled={date <= minimumDate}
				onClick={() => handleChange(date.minusMonths(1))}
			>
				<Icon name="arrow left"/>
			</Button>
			<Dropdown
				name={name}
				icon={<div/>}
				button
				basic
				scrolling
				value={date.monthValue()}
				options={createDropdownOptions()}
				onChange={(e, val: {value?: any}) => handleChange(date.withMonth(val.value))}
				error={error}
			/>
			<Button
				basic
				icon
				color={error ? 'red' : 'green'}
				disabled={date >= maximumDate}
				onClick={() => handleChange(date.plusMonths(1))}
			>
				<Icon name="arrow right"/>
			</Button>
		</Input>
	);
}
