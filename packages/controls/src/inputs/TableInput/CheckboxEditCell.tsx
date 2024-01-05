import debug from 'debug';
import {useState} from 'react';
import {Checkbox, CheckboxProps} from 'semantic-ui-react';
import type {TableCellProps} from './TableInput';
import type {AddRowOnTabIf} from './addRowOnTab';
import {addRowOnTab} from './addRowOnTab';

const d = debug('thx.controls.inputs.TableInput.CheckboxEditCell');

interface CheckboxEditCellOptions<D extends Record<string, unknown>> {
	/** Override SemanticUI Input props */
	inputProps?: CheckboxProps;
	/** If function is present, and returns true, will add a new row if tab is pressed on the last row */
	addRowOnTabIf?: AddRowOnTabIf<D, boolean>;
}

export function CheckboxEditCell<D extends Record<string, unknown>>(options?: CheckboxEditCellOptions<D>) {
	const {inputProps, addRowOnTabIf} = options || {};

	return function CheckboxEditCellFn(props: TableCellProps<D, boolean>) {
		const {
			value: initialValue,
			row: {index},
			column: {id},
			updateData,
		} = props;

		const [value, setValue] = useState(initialValue);

		return (
			<Checkbox
				{...inputProps}
				checked={value}
				onChange={(ev, v) => {
					setValue(v.checked || false);
				}}
				onBlur={() => {
					updateData(index, id, value);
				}}
				onKeyDown={(event: KeyboardEvent) => addRowOnTab(event, value, props, addRowOnTabIf)}
			/>
		);
	};
}
