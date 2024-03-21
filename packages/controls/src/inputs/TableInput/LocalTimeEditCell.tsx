import type {LocalTime} from '@js-joda/core';
import debug from 'debug';
import {useState} from 'react';
import type {TableCellProps} from './TableInput';
import {LocalTimePicker} from '../../date/LocalTimePicker';

const d = debug('thx.controls.inputs.TableInput.LocalDateEditCell');

export function LocalTimeEditCell<D extends Record<string, unknown>>() {
	return function LocalTimeEditCellFn(props: TableCellProps<D, LocalTime | null>) {
		const {
			value: initialValue,
			row: {index: rowIndex},
			column: {id},
			updateData,
		} = props;

		const [value, setValue] = useState(initialValue);

		return (
			<LocalTimePicker
				fluid
				transparent
				value={value}
				onChange={val => {
					setValue(val);
					updateData(rowIndex, id, val);
				}}
				onBlur={() => {
					updateData(rowIndex, id, value);
				}}
			/>
		);
	};
}
