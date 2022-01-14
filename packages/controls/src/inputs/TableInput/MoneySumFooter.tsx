import {formatMoney, toMoney} from '@thx/money';
import type {IdType, TableInstance} from 'react-table';

interface MoneySumFooterOptions<A extends Record<string, unknown>> {
	id: IdType<A>;
}

export function MoneySumFooter<A extends Record<string, unknown>>(options: MoneySumFooterOptions<A>) {
	const {id} = options || {};

	return function MoneySumFooterInstance(info: TableInstance<A>) {
		const sum = info.rows.reduce((memo, row) => memo.add(row.values[id]), toMoney());
		return <div style={{textAlign: 'right'}}>{formatMoney(sum)}</div>;
	};
}
