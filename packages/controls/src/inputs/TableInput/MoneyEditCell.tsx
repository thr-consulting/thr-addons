import debug from 'debug';
import type Money from 'js-money';
import {useState} from 'react';
import type {KeyboardEvent} from 'react';
import {MoneyInput} from '../../money/MoneyInput';
import type {MaskedInputProps} from '../MaskedInput';
import type {TableCellProps} from './TableInput';
import type {AddRowOnTabIf} from './addRowOnTab';
import {addRowOnTab} from './addRowOnTab';

const d = debug('thx.controls.inputs.TableInput.MoneyEditCell');

interface MoneyEditCellOptions<D extends Record<string, unknown>> {
	/** If function is present, and returns true, will add a new row if tab is pressed on the last row */
	addRowOnTabIf?: AddRowOnTabIf<D, Money>;
	inputProps?: MaskedInputProps;
}

export function MoneyEditCell<D extends Record<string, unknown>>(opts?: MoneyEditCellOptions<D>) {
	return function MoneyEditCellFn(props: TableCellProps<D, Money>) {
		const {
			value: initialValue,
			row: {index: rowIndex},
			column: {id},
			updateData,
		} = props;

		const [value, setValue] = useState(initialValue);

		const {variant, ...rest} = opts?.inputProps || {};

		return (
			<MoneyInput
				variant={typeof variant === 'string' ? variant : 'unstyled'}
				{...rest}
				value={value}
				onChange={setValue}
				onBlur={() => {
					updateData(rowIndex, id, value);
				}}
				onKeyDown={(event: KeyboardEvent) => addRowOnTab(event, value, props, opts?.addRowOnTabIf)}
			/>
		);
	};
}
