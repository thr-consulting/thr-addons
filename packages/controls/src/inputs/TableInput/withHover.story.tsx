import {useArgs} from '@storybook/client-api';
import {toMoney} from '@thx/money';
import debug from 'debug';
import type Money from 'js-money';
import React, {useMemo, useState} from 'react';
import {Button, Grid, Icon, Modal} from 'semantic-ui-react';
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

const options = [
	{key: 'a', text: 'The Letter A', value: 'a'},
	{key: 'b', text: 'The Letter B', value: 'b'},
];

export const WithHover = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const memoizedColumns = useMemo(
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
				Header: () => <div style={{textAlign: 'right'}}>Amount</div>,
				accessor: 'amount',
				Cell: MoneyEditCell(),
				Footer: MoneySumFooter<JournalLine>({id: 'amount'}),
			},
			{
				Header: () => <div style={{textAlign: 'right'}}>GST</div>,
				accessor: 'gst',
				Cell: MoneyEditCell<JournalLine>({
					addRowOnTabIf: (p, newValue) => !p.row.values.amount.isZero() || !newValue.isZero(),
				}),
				Footer: MoneySumFooter<JournalLine>({id: 'gst'}),
			},
			{
				Header: () => <div style={{textAlign: 'right'}}>Total</div>,
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
					Action: () => <Icon name="trash alternate" color="red" style={{cursor: 'pointer'}} onClick={() => setShowDeleteModal(true)} />,
				}),
				accessor: 'action',
				Header: () => <div style={{textAlign: 'right'}}>Action</div>,
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
					<>
						<Modal
							basic
							size="small"
							dimmer="blurring"
							open={showDeleteModal}
							onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
							onClose={e => e.stopPropagation()}
						>
							<Modal.Content>
								<Grid columns="equal">
									<Grid.Row>
										<Grid.Column>
											<h3>
												<Icon color="red" name="delete" />
												Delete row?
											</h3>
										</Grid.Column>
									</Grid.Row>
									<Grid.Row>
										<Grid.Column>
											<Button
												color="red"
												inverted
												onClick={e => {
													e.stopPropagation();
													setShowDeleteModal(false);
												}}
											>
												<Icon name="trash" /> Delete
											</Button>
											<Button
												inverted
												color="green"
												type="cancel"
												floated="right"
												onClick={e => {
													e.stopPropagation();
													setShowDeleteModal(false);
												}}
											>
												<Icon name="dont" /> Cancel
											</Button>
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</Modal.Content>
						</Modal>
						<TableInput<JournalLine>
							name="journal.lines"
							values={values.journal.lines}
							columns={memoizedColumns}
							setFieldValue={setFieldValue}
							createRow={() => ({account: 'a', name: 'New', amount: toMoney(), gst: toMoney()})}
							tableProps={() => ({
								compact: true,
								celled: true,
								basic: 'very',
							})}
							footerCellProps={() => ({
								style: {paddingTop: '7px', paddingBottom: '7px'},
							})}
						/>
					</>
				);
			}}
		</TForm>
	);
};
WithHover.args = {
	value: undefined,
};
