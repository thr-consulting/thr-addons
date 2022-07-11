import {Button, Modal, Title} from '@mantine/core';
import {toMoney} from '@thx/money';
import debug from 'debug';
import type Money from 'js-money';
import {useMemo, useState} from 'react';
import {Trash} from 'tabler-icons-react';
import {TForm} from '../../form/TForm';
import {DropdownCell} from './DropdownCell';
import {HoverCell} from './HoverCell';
import {MoneyCell} from './MoneyCell';
import {MoneyEditCell} from './MoneyEditCell';
import {MoneySumFooter} from './MoneySumFooter';
import {StringEditCell} from './StringEditCell';
import {TableInput} from './TableInput';

const d = debug('thx.controls.inputs.TableInput.withHover.story');

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

function RightHeader({title}: {title: string}) {
	return <div style={{textAlign: 'right'}}>{title}</div>;
}

function TrashIcon({onClick}: {onClick: () => void}) {
	return <Trash color="red" style={{cursor: 'pointer'}} onClick={onClick} />;
	// return <Icon name="trash alternate" color="red" style={{cursor: 'pointer'}} onClick={onClick} />;
}

export function WithHover() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	// const [, updateArgs] = useArgs();

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const memoizedColumns = useMemo(
		() => [
			{
				accessor: 'account',
				Header: 'Account',
				Cell: DropdownCell({
					data,
					searchable: true,
				}),
			},
			{
				accessor: 'name',
				Header: 'Name',
				Cell: StringEditCell(),
			},
			{
				Header: <RightHeader title="Amount" />,
				accessor: 'amount',
				Cell: MoneyEditCell(),
				Footer: MoneySumFooter<JournalLine>({id: 'amount'}),
			},
			{
				Header: <RightHeader title="GST" />,
				accessor: 'gst',
				Cell: MoneyEditCell<JournalLine>({
					addRowOnTabIf: (p, newValue) => !p.row.values.amount.isZero() || !newValue.isZero(),
				}),
				Footer: MoneySumFooter<JournalLine>({id: 'gst'}),
			},
			{
				Header: <RightHeader title="Total" />,
				accessor: 'total',
				Cell: MoneyCell({
					overrideValue: ({
						row: {
							values: {amount, gst},
						},
					}) => amount.add(gst),
				}),
			},
			{
				Cell: HoverCell({
					action: <TrashIcon onClick={() => setShowDeleteModal(true)} />,
				}),
				accessor: 'action',
				Header: <RightHeader title="Action" />,
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
		>
			{props => {
				const {values, setFieldValue} = props;
				return (
					<>
						<Modal title={<Title order={3}>Delete row?</Title>} centered opened={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
							<Button>Delete</Button>
						</Modal>
						<TableInput<JournalLine>
							name="journal.lines"
							values={values.journal.lines}
							columns={memoizedColumns}
							setFieldValue={setFieldValue}
							createRow={() => ({account: 'a', name: 'New', amount: toMoney(), gst: toMoney()})}
							tableProps={{
								verticalSpacing: 2,
								celled: true,
							}}
							footerCellProps={() => ({
								style: {paddingTop: '7px', paddingBottom: '7px'},
							})}
						/>
					</>
				);
			}}
		</TForm>
	);
}
WithHover.args = {
	value: undefined,
};
