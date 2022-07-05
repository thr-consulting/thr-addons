import {Dropdown} from 'semantic-ui-react';
import type {DropdownProps} from 'semantic-ui-react';
import type {TableCellProps} from './TableInput';

export function DropdownCell<D extends Record<string, unknown>>(dropdownProps: DropdownProps) {
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
			<Dropdown
				{...rest}
				value={value}
				onChange={(event, val) => {
					updateData(rowIndex, id, val.value);
					if (onChange) onChange(event, val);
				}}
			/>
		);
	};
}
