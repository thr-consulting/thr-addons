import React from 'react';
import {Button, Dropdown, Input} from '@fluentui/react-northstar';
import {ArrowLeftIcon, ArrowRightIcon} from '@fluentui/react-icons-northstar';
import type {InputProps, DropdownItemProps} from '@fluentui/react-northstar';
import debug from 'debug';

const d = debug('thx.controls.YearSelect');

export interface YearSelectProps {
	onChange?: (value: number) => void;
	onBlur?: (ev: any) => void;
	value: number;
	minYear?: number; // Defaults to 1970
	maxYear?: number; // Defaults to current year
	error?: boolean; // Defaults to false
}

export function YearSelect(props: YearSelectProps & Omit<InputProps, 'onChange'>) {
	const thisYear = new Date().getFullYear();
	const {value, minYear = 1970, maxYear = thisYear, onChange, onBlur, error, ...rest} = props;

	const availableYears: DropdownItemProps[] = [];
	for (let i = maxYear; i >= minYear; i--) {
		availableYears.push({value: i, header: i.toString(), key: i});
	}

	return (
		<>
			<Button
				icon={<ArrowLeftIcon />}
				type="button"
				color={error ? 'red' : 'green'}
				disabled={value <= minYear}
				onClick={() => {
					if (onChange) onChange(value - 1);
				}}
				onBlur={onBlur}
			/>
			<Dropdown
				inline
				search
				value={value}
				items={availableYears}
				onChange={(e, val) => {
					if (typeof val.value === 'number' && onChange) onChange(val.value);
				}}
				// error={error}
				// onBlur={onBlur}
			/>
			<Button
				icon={<ArrowRightIcon />}
				type="button"
				color={error ? 'red' : 'green'}
				disabled={value >= maxYear}
				onClick={() => {
					if (onChange) onChange(value + 1);
				}}
				onBlur={onBlur}
			/>
		</>
	);
}

/*

 */
