import debug from 'debug';
import React, {useEffect, useState} from 'react';
import {Dropdown, DropdownItemProps, DropdownProps} from '@fluentui/react-northstar';
import {LocalDate} from '@js-joda/core';

const d = debug('thx.controls.LocalMonthSelect');

interface MyItems extends DropdownItemProps {
	value: number;
}

const monthOptions: MyItems[] = [
	{header: 'January', value: 1},
	{header: 'February', value: 2},
	{header: 'March', value: 3},
	{header: 'April', value: 4},
	{header: 'May', value: 5},
	{header: 'June', value: 6},
	{header: 'July', value: 7},
	{header: 'August', value: 8},
	{header: 'September', value: 9},
	{header: 'October', value: 10},
	{header: 'November', value: 11},
	{header: 'December', value: 12},
];

interface CustomLocalMonthSelectProps {
	onChange?: (value: LocalDate | null) => void;
	value?: LocalDate | null;
	year?: number;
}

export type LocalMonthSelectProps = CustomLocalMonthSelectProps & Omit<DropdownProps, 'value' | 'onChange' | 'items' | 'placeholder'>;

export function LocalMonthSelect(props: LocalMonthSelectProps): JSX.Element {
	const {value, onChange, year, ...rest} = props;
	const [yearValue, setYearValue] = useState<number>(LocalDate.now().year());

	useEffect(() => {
		const theYear = year || LocalDate.now().year();
		setYearValue(theYear);
		if (onChange && value) onChange(LocalDate.of(theYear, value.monthValue(), 1));
	}, [year]);

	return (
		// @ts-ignore
		<Dropdown
			placeholder="Select Month"
			items={monthOptions}
			value={value ? monthOptions[value.monthValue() - 1] : ''}
			onChange={(ev, v) => {
				if (onChange) {
					if (v.highlightedIndex !== undefined && v.highlightedIndex >= 0) {
						onChange(LocalDate.of(yearValue, monthOptions[v.highlightedIndex || 0].value, 1));
					} else {
						onChange(null);
					}
				}
			}}
			{...rest}
		/>
	);
}
