import {useArgs} from '@storybook/client-api';
import {toMoney} from '@thx/money';
import debug from 'debug';
import type Money from 'js-money';
import {useMemo} from 'react';
import type {Column} from 'react-table';
import {TForm} from '../../form/TForm';
import {DropdownCell} from './DropdownCell';
import {MoneyCell} from './MoneyCell';
import {MoneyEditCell} from './MoneyEditCell';
import {MoneySumFooter} from './MoneySumFooter';
import {StringEditCell} from './StringEditCell';
import {TableInput} from './TableInput';

const d = debug('thx.controls.inputs.TableInput.main.story');

interface JournalLine extends Record<string, unknown> {
	account: string;
	name: string;
	amount: Money;
	gst: Money;
}

const data = [
	{label: 'The Letter A', value: 'a'},
	{label: 'The Letter B', value: 'b'},
];

export function Main() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();

	const mainColumns = useMemo<Column<JournalLine>[]>(
		() => [
			{
				accessor: 'account',
				Header: 'Account',
				Cell: DropdownCell({
					data,
					variant: 'unstyled',
					searchable: true,
				}),
			},
			{
				accessor: 'name',
				Header: 'Name',
				Cell: StringEditCell(),
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				Cell: MoneyEditCell(),
				Footer: MoneySumFooter<JournalLine>({id: 'amount'}),
			},
			{
				Header: 'GST',
				accessor: 'gst',
				Cell: MoneyEditCell<JournalLine>({
					addRowOnTabIf: (props, newValue) => !props.row.values.amount.isZero() || !newValue.isZero(),
				}),
				Footer: MoneySumFooter<JournalLine>({id: 'gst'}),
			},
			{
				Header: 'Total',
				accessor: 'total',
				Cell: MoneyCell({
					overrideValue: ({
						row: {
							values: {amount, gst},
						},
					}) => amount.add(gst),
				}),
			},
		],
		[],
	);

	return (
		<TForm
			initialValues={{
				journal: {
					lines: [{name: 'Data', amount: toMoney(10), gst: toMoney(2)}],
				},
			}}
			onSubmit={v => {
				d('Data submitted', v);
			}}
			onChange={v => {
				updateArgs({value: v});
			}}
		>
			{props => {
				const {values, handleSubmit, handleBlur, setFieldValue} = props;
				return (
					<TableInput<JournalLine>
						name="journal.lines"
						values={values.journal.lines}
						columns={mainColumns}
						setFieldValue={setFieldValue}
						createRow={() => ({account: 'a', name: 'New', amount: toMoney(), gst: toMoney()})}
						tableProps={{
							highlightOnHover: true,
							verticalSpacing: 2,
							celled: true,
						}}
						footerCellProps={() => ({
							style: {paddingTop: '7px', paddingBottom: '7px'},
						})}
					/>
				);
			}}
		</TForm>
	);
}
Main.args = {
	value: undefined,
};
