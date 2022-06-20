import type {CellProps} from 'react-table';
import type {LocalDate} from "@js-joda/core";
import {formatDate} from '@thx/date';

interface LocalDateCellOptions<D extends Record<string, unknown>> {
	/** If provided, this function will override the LocalDate value displayed */
	overrideValue?: (props: CellProps<D, LocalDate>) => LocalDate;
}

export function LocalDateCell<D extends Record<string, unknown>>(options?: LocalDateCellOptions<D>) {
	return function LocalDateCellFn(props: CellProps<D, LocalDate>) {
		return <div style={{textAlign: 'right'}}>{formatDate(options?.overrideValue ? options.overrideValue(props) : props.value)}</div>;
	};
}
