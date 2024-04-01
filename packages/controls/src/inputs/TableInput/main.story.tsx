import {LocalDate} from '@js-joda/core';
import {useArgs} from '@storybook/client-api';
import {toMoney} from '@thx/money';
import debug from 'debug';
import type Money from 'js-money';
import {useMemo} from 'react';
import type {Column} from 'react-table';
import {TForm} from '../../form/TForm';
import {DropdownCell} from './DropdownCell';
import {LocalDateEditCell} from './LocalDateEditCell';
import {MoneyCell} from './MoneyCell';
import {MoneyEditCell} from './MoneyEditCell';
import {MoneySumFooter} from './MoneySumFooter';
import {StringEditCell} from './StringEditCell';
import {TableInput} from './TableInput';
import {NumberEditCell} from './NumberEditCell';

const d = debug('thx.controls.inputs.TableInput.main.story');

interface JournalLine extends Record<string, unknown> {
	account: string;
	name: string;
	amount: Money;
	gst: Money;
}

const options = [
	{key: 'a', text: 'The Letter A', value: 'a'},
	{key: 'b', text: 'The Letter B', value: 'b'},
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
					options,
					basic: true,
					search: true,
				}),
			},
			{
				accessor: 'name',
				Header: 'Name',
				Cell: StringEditCell(),
			},
			{
				accessor: 'number',
				Header: 'Number',
				Cell: NumberEditCell(),
			},
			{
				accessor: 'date',
				Header: 'Date',
				Cell: LocalDateEditCell(),
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				Cell: MoneyEditCell({
					tabIndex: 2,
				}),
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
					lines: [{name: 'Data', date: LocalDate.now(), amount: toMoney(10), gst: toMoney(2)}],
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
						createRow={() => ({account: 'a', name: 'New', date: LocalDate.now(), amount: toMoney(), gst: toMoney()})}
						tableProps={() => ({
							compact: true,
							celled: true,
							basic: 'very',
						})}
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
