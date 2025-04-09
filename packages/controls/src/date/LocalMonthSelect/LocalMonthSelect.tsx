import {LocalDate} from '@js-joda/core';
import debug from 'debug';
import {Select, SelectProps} from 'semantic-ui-react';

const d = debug('thx.controls.date.LocalMonthSelect');

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

interface ILocalMonthSelectProps {
	onChange?: (value: LocalDate | null) => void;
	value?: LocalDate | null;
	year?: number;
	handleBlur?: (event: any) => void;
}

export type LocalMonthSelectProps = ILocalMonthSelectProps & Omit<SelectProps, 'options'>;

export function LocalMonthSelect(props: LocalMonthSelectProps): JSX.Element {
	const {value, onChange, year, handleBlur, ...rest} = props;

	const theYear = year || LocalDate.now().year();

	return (
		<Select
			placeholder="Select Month"
			options={monthOptions}
			value={value ? value.monthValue() : ''}
			onChange={(ev, v) => {
				if (onChange) {
					if (typeof v.value === 'number') {
						onChange(v ? LocalDate.of(theYear, v.value, 1) : null);
					} else {
						onChange(null);
					}
				}
			}}
			onBlur={handleBlur}
			{...rest}
		/>
	);
}
