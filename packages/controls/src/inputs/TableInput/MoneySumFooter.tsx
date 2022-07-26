import {formatMoney, toMoney} from '@thx/money';
import type {IdType, TableInstance} from 'react-table';
import type Money from 'js-money';

interface MoneySumFooterOptions<A extends Record<string, unknown>> {
	id: IdType<A>;
}

type Row = {
	values: Record<IdType<Money>, Money>;
};

export function MoneySumFooter<A extends Record<string, unknown>>(options: MoneySumFooterOptions<A>) {
	const {id} = options || {};

	return function MoneySumFooterInstance(info: TableInstance<A>) {
		const sum = info.rows.reduce((memo, row: Row) => {
			// checks to make sure we have an instance of money -STT
			if (row.values[id]?.currency && row.values[id]?.amount) {
				return memo.add(row.values[id]);
			}
			return memo;
		}, toMoney());
		return <div style={{textAlign: 'right'}}>{formatMoney(sum)}</div>;
	};
}
