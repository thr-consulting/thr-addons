import debug from 'debug';
import {Button, Group, NumberInput} from '@mantine/core';
import {ArrowBigLeft, ArrowBigRight} from 'tabler-icons-react';

const d = debug('thx.controls.date.YearSelect');

export interface YearSelectProps {
	onChange?: (value: number) => void;
	value: number;
	minYear?: number; // Defaults to 1970
	maxYear?: number; // Defaults to current year
	error?: boolean; // Defaults to false
}

export function YearSelect(props: YearSelectProps) {
	const thisYear = new Date().getFullYear();
	const {value, minYear = 1970, maxYear = thisYear, onChange, error, ...rest} = props;

	// const availableYears: DropdownItemProps[] = [];
	// for (let i = maxYear; i >= minYear; i--) {
	// 	availableYears.push({value: i, text: i.toString(), key: i});
	// }

	return (
		<Group spacing={3}>
			<Button component={ArrowBigLeft} size="lg" compact variant="outline" />
			<NumberInput
				value={value}
				onChange={v => {
					if (v && onChange) onChange(v);
				}}
				sx={{width: '85px'}}
			/>
			<Button component={ArrowBigRight} size="lg" compact variant="outline" />
		</Group>
	);

	/*
	return (
		<Segment basic compact style={{padding: 0, margin: 0}} {...rest}>
			<Button
				basic
				icon
				type="button"
				color={error ? 'red' : 'green'}
				disabled={value <= minYear}
				onClick={() => {
					if (onChange) onChange(value - 1);
				}}
				onBlur={onBlur}
			>
				<Icon name="arrow left" />
			</Button>
			<Dropdown
				icon={<div />}
				button
				basic
				scrolling
				value={value}
				options={availableYears}
				onChange={(e, val) => {
					if (typeof val.value === 'number' && onChange) onChange(val.value);
				}}
				error={error}
				onBlur={onBlur}
			/>
			<Button
				basic
				icon
				type="button"
				color={error ? 'red' : 'green'}
				disabled={value >= maxYear}
				onClick={() => {
					if (onChange) onChange(value + 1);
				}}
				onBlur={onBlur}
				style={{marginRight: 0}}
			>
				<Icon name="arrow right" />
			</Button>
		</Segment>
	);

	 */
}
