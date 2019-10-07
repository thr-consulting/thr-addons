import React from 'react';
import {Icon, Button, Dropdown, Input} from 'semantic-ui-react';
import debug from 'debug';

const d = debug('thx.controls.date.YearSelect');

interface Props {
	name: string,
	onChange?: Function,
	handleBlur? : Function,
	value?: number | string,
	minYear?: number | string,
	maxYear?: number | string,
	fieldError? : () => boolean,
}

export default function YearSelect(props: Props): JSX.Element {
	const thisYear = new Date().getFullYear();
	const {value, minYear = 1970, maxYear = thisYear, onChange = () => {}, name, fieldError, ...rest} = props;
	let numValue = thisYear;
	const error = fieldError ? fieldError() : false;
	if (value && typeof value !== 'string') numValue = value;

	const getOptions = () => {
		const array: {value: number, text: number, key: number}[] = [];
		for (let i = parseInt(maxYear as string, 10); i >= minYear; i--) {
			array.push({value: i, text: i, key: i});
		}
		return array;
	};

	const handleChange = (val: number | string) => {
		const v = parseInt(val as string, 10);
		// (arg1, arg2) => props.setFieldValue(n, arg2 ? arg2.value : arg1)
		return onChange.name === 'handleChange' ? onChange(`${name}`)(v) : onChange(v);
	};

	return (
		<Input {...rest}>
			<Button
				basic
				icon
				color={error ? 'red' : 'green'}
				disabled={numValue === parseInt(minYear as string, 10)}
				onClick={() => handleChange(numValue - 1)}
			>
				<Icon name="arrow left"/>
			</Button>
			<Dropdown
				name={name}
				icon={<div/>}
				button
				basic
				scrolling
				value={numValue}
				options={getOptions()}
				onChange={(e, val) => handleChange(val.value as string)}
				error={error}
			/>
			<Button
				basic
				icon
				color={error ? 'red' : 'green'}
				disabled={numValue === parseInt(maxYear as string, 10)}
				onClick={() => handleChange(numValue + 1)}
			>
				<Icon name="arrow right"/>
			</Button>
		</Input>
	);
}
