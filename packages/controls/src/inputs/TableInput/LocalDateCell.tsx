import type {LocalDate} from '@js-joda/core';
import {formatDate, type FormatDateParams} from '@thx/date';
import type {CellProps} from 'react-table';

interface LocalDateCellOptions<D extends Record<string, unknown>> {
	/** If provided, this function will override the LocalDate value displayed */
	overrideValue?: (props: CellProps<D, LocalDate>) => LocalDate;
	dateFormat?: FormatDateParams;
}

export function LocalDateCell<D extends Record<string, unknown>>(options?: LocalDateCellOptions<D>) {
	return function LocalDateCellFn(props: CellProps<D, LocalDate>) {
		return <div style={{textAlign: 'right'}}>{formatDate(options?.overrideValue ? options.overrideValue(props) : props.value, options?.dateFormat)}</div>;
	};
}
