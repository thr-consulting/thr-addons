import {LocalDate} from '@js-joda/core';
import debug from 'debug';
import {useState} from 'react';
import {LocalDatePicker} from '../../date/LocalDatePicker';
import type {TableCellProps} from './TableInput';

const d = debug('thx.controls.inputs.TableInput.LocalDateEditCell');

export function LocalDateEditCell<D extends Record<string, unknown>>() {
	return function LocalDateEditCellFn(props: TableCellProps<D, LocalDate>) {
		const {
			value: initialValue,
			row: {index: rowIndex},
			column: {id},
			updateData,
		} = props;

		const [value, setValue] = useState(initialValue);

		return (
			<LocalDatePicker
				fluid
				transparent
				value={value}
				onChange={val => setValue(val || LocalDate.now())}
				onBlur={() => {
					updateData(rowIndex, id, value);
				}}
			/>
		);
	};
}
