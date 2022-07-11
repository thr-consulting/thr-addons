import type {KeyboardEvent} from 'react';
import type {TableCellProps} from './TableInput';

export type AddRowOnTabIf<D extends Record<string, unknown>, V = any> = (props: TableCellProps<D, V>, newValue: V) => boolean;

/**
 * Use as an onKeyDown event handler to add a new row when tab is pressed, depending on certain criteria.
 * @param event
 * @param value
 * @param props
 * @param addRowOnTabIf
 */
export function addRowOnTab<D extends Record<string, unknown>, V = any>(
	event: KeyboardEvent,
	value: V,
	props: TableCellProps<D, V>,
	addRowOnTabIf?: AddRowOnTabIf<D, V>,
) {
	const {
		row: {index: rowIndex},
		rows: {length: rowsLength},
		addRow,
	} = props;

	if (event.key === 'Tab' && !event.shiftKey && rowIndex + 1 === rowsLength && (addRowOnTabIf ? addRowOnTabIf(props, value) : false)) {
		addRow();
	}
}
