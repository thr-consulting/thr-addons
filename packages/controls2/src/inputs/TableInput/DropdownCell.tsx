import {Select, SelectProps} from '@mantine/core';
import type {TableCellProps} from './TableInput';

export function DropdownCell<D extends Record<string, unknown>>(dropdownProps: SelectProps) {
	return function DropdownCellFn(props: TableCellProps<D>) {
		const {
			value,
			row: {index: rowIndex},
			column: {id},
			updateData,
		} = props;

		// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
		const {value: v, onChange, ...rest} = dropdownProps;

		return (
			<Select
				{...rest}
				value={value}
				onChange={val => {
					updateData(rowIndex, id, val);
					if (onChange) onChange(val);
				}}
			/>
		);
	};
}
