import debug from 'debug';
import {useState} from 'react';
import {LocalDate} from '@js-joda/core';
import type {TableCellProps} from './TableInput';
import type {AddRowOnTabIf} from './addRowOnTab';
import {LocalDatePicker} from '../../date/LocalDatePicker';

const d = debug('thx.controls.inputs.TableInput.LocalDateEditCell');

interface LocalDateEditCellOptions<D extends Record<string, unknown>> {
	/** If function is present, and returns true, will add a new row if tab is pressed on the last row */
	addRowOnTabIf?: AddRowOnTabIf<D, LocalDate>;
}

export function LocalDateEditCell<D extends Record<string, unknown>>(opts?: LocalDateEditCellOptions<D>) {
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
