import {LocalDate} from '@js-joda/core';
import debug from 'debug';
import {Select} from '@mantine/core';
import type {SelectProps} from '@mantine/core';

const d = debug('thx.controls.date.LocalMonthSelect');

const monthOptions = [
	{label: 'January', value: '1'},
	{label: 'February', value: '2'},
	{label: 'March', value: '3'},
	{label: 'April', value: '4'},
	{label: 'May', value: '5'},
	{label: 'June', value: '6'},
	{label: 'July', value: '7'},
	{label: 'August', value: '8'},
	{label: 'September', value: '9'},
	{label: 'October', value: '10'},
	{label: 'November', value: '11'},
	{label: 'December', value: '12'},
];

interface ILocalMonthSelectProps {
	onChange?: (value: LocalDate | null) => void;
	value?: LocalDate | null;
	year?: number;
}

export type LocalMonthSelectProps = ILocalMonthSelectProps & Omit<SelectProps, 'options' | 'data' | 'value'>;

export function LocalMonthSelect(props: LocalMonthSelectProps): JSX.Element {
	const {value, onChange, year, ...rest} = props;

	const theYear = year || LocalDate.now().year();

	return (
		<Select
			data={monthOptions}
			value={value ? `${value.monthValue()}` : null}
			onChange={v => {
				if (onChange) {
					if (v) {
						onChange(LocalDate.of(theYear, parseInt(v, 10), 1));
					}
				}
			}}
			{...rest}
		/>
	);
}
