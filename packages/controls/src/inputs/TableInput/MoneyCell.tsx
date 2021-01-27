import React from 'react';
import type {CellProps} from 'react-table';
import type Money from 'js-money';
import {formatMoney} from '@thx/money';

interface MoneyCellOptions<D extends Record<string, unknown>> {
	/** If provided, this function will override the Money value displayed */
	overrideValue?: (props: CellProps<D, Money>) => Money;
}

export function MoneyCell<D extends Record<string, unknown>>(options?: MoneyCellOptions<D>) {
	return function MoneyCellFn(props: CellProps<D, Money>) {
		return <div style={{textAlign: 'right'}}>{formatMoney(options?.overrideValue ? options.overrideValue(props) : props.value)}</div>;
	};
}
