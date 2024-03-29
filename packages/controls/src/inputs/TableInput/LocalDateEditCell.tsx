import type {LocalDate} from '@js-joda/core';
import debug from 'debug';
import {useState} from 'react';
import {LocalDatePicker} from '../../date/LocalDatePicker';
import type {TableCellProps} from './TableInput';

const d = debug('thx.controls.inputs.TableInput.LocalDateEditCell');

export function LocalDateEditCell<D extends Record<string, unknown>>() {
	return function LocalDateEditCellFn(props: TableCellProps<D, LocalDate | null>) {
		const {
			value: initialValue,
			row: {index: rowIndex},
			column: {id},
			updateData,
			hoverRow,
		} = props;

		const [value, setValue] = useState(initialValue);

		return (
			<LocalDatePicker
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
				icon={hoverRow.toString() === rowIndex.toString()}
			/>
		);
	};
}
