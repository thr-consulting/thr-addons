import debug from 'debug';
import {useState} from 'react';
import {Input, type InputProps} from 'semantic-ui-react';
import type {TableCellProps} from './TableInput';
import type {AddRowOnTabIf} from './addRowOnTab';
import {addRowOnTab} from './addRowOnTab';

const d = debug('thx.controls.inputs.TableInput.NumberEditCell');

interface NumberEditCellOptions<D extends Record<number, unknown>> {
	/** Override SemanticUI Input props */
	inputProps?: InputProps;
	/** If function is present, and returns true, will add a new row if tab is pressed on the last row */
	addRowOnTabIf?: AddRowOnTabIf<D, number>;
}

export function NumberEditCell<D extends Record<number, unknown>>(options?: NumberEditCellOptions<D>) {
	const {inputProps, addRowOnTabIf} = options || {};

	return function NumberEditCellFn(props: TableCellProps<D, number>) {
		const {
			value: initialValue,
			row: {index},
			column: {id},
			updateData,
		} = props;

		const [value, setValue] = useState(initialValue?.toString());

		return (
			<Input
				type="number"
				fluid
				transparent
				{...inputProps}
				value={value}
				onChange={(ev, v) => {
					setValue(v.value);
				}}
				onBlur={() => {
					updateData(index, id, parseFloat(value || '0'));
				}}
				onKeyDown={(event: KeyboardEvent) => addRowOnTab(event, parseFloat(value), props, addRowOnTabIf)}
			/>
		);
	};
}
