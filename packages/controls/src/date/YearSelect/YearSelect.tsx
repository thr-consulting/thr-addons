import debug from 'debug';
import {Button, ButtonProps, Group, NumberInput} from '@mantine/core';
import {ArrowLeft, ArrowRight} from 'tabler-icons-react';

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
	const {value, minYear = 1970, maxYear = thisYear, onChange, error} = props;

	const buttonProps: ButtonProps<any> = {
		size: 'sm',
		compact: true,
		variant: 'outline',
		sx: {height: 36},
	};

	return (
		<Group spacing={2}>
			<Button
				{...buttonProps}
				disabled={value <= minYear}
				onClick={() => {
					if (onChange) onChange(value - 1);
				}}
			>
				<ArrowLeft />
			</Button>
			<NumberInput
				hideControls
				value={value}
				max={maxYear}
				min={minYear}
				onChange={v => {
					if (v && onChange) {
						onChange(v);
					}
				}}
				sx={{width: '4rem'}}
				styles={{input: {borderColor: error ? 'red' : undefined, textAlign: 'center'}}}
			/>
			<Button
				{...buttonProps}
				disabled={value >= maxYear}
				onClick={() => {
					if (onChange) onChange(value + 1);
				}}
			>
				<ArrowRight />
			</Button>
		</Group>
	);
}
