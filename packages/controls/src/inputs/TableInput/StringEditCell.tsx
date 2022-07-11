import {TextInput, TextInputProps} from '@mantine/core';
import debug from 'debug';
import {useState, KeyboardEvent} from 'react';
import type {TableCellProps} from './TableInput';
import type {AddRowOnTabIf} from './addRowOnTab';
import {addRowOnTab} from './addRowOnTab';

const d = debug('thx.controls.inputs.TableInput.StringEditCell');

interface StringEditCellOptions<D extends Record<string, unknown>> {
	/** Override SemanticUI Input props */
	inputProps?: TextInputProps;
	/** If function is present, and returns true, will add a new row if tab is pressed on the last row */
	addRowOnTabIf?: AddRowOnTabIf<D, string>;
}

export function StringEditCell<D extends Record<string, unknown>>(options?: StringEditCellOptions<D>) {
	const {inputProps, addRowOnTabIf} = options || {};

	return function StringEditCellFn(props: TableCellProps<D, string>) {
		const {
			value: initialValue,
			row: {index},
			column: {id},
			updateData,
		} = props;

		const [value, setValue] = useState(initialValue);

		const {variant, ...rest} = inputProps || {};

		return (
			<TextInput
				{...rest}
				variant={typeof variant === 'string' ? variant : 'unstyled'}
				value={value}
				onChange={ev => {
					setValue(ev.target.value);
				}}
				onBlur={() => {
					updateData(index, id, value);
				}}
				onKeyDown={(event: KeyboardEvent) => addRowOnTab(event, value, props, addRowOnTabIf)}
			/>
		);
	};
}
