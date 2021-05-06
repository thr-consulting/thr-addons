import {toMoney} from '@thx/money';
import {moneySchemaType} from '@thx/yup-types';
import debug from 'debug';
import type Money from 'js-money';
import React, {useMemo, useState} from 'react';
import type {Column} from 'react-table';
import {Form, Container, Input, Icon, Modal, Grid, Button} from 'semantic-ui-react';
import {object, string, array} from 'yup';
import {TForm} from '../../form/TForm';
import {DropdownCell} from './DropdownCell';
import {HoverCell} from './HoverCell';
import {MoneyCell} from './MoneyCell';
import {MoneyEditCell} from './MoneyEditCell';
import {MoneySumFooter} from './MoneySumFooter';
import {StringEditCell} from './StringEditCell';
import {TableInput} from './TableInput';

const d = debug('thx.controls.inputs.TableInput.tableinput.stories');

export default {title: 'Inputs/TableInput'};

const formValidation = object().shape({
	text: string().required(),
	journal: object().shape({
		lines: array().of(
			object().shape({
				name: string().required(),
				amount: moneySchemaType().required(),
				gst: moneySchemaType().required(),
			}),
		),
	}),
});
interface JournalLine extends Record<string, unknown> {
	name: string;
	amount: Money;
	gst: Money;
}
interface Journal {
	lines: JournalLine[];
}
interface FormValidationType {
	text: string;
	journal: Journal;
}

const options = [
	{key: 'a', text: 'The Letter A', value: 'a'},
	{key: 'b', text: 'The Letter B', value: 'b'},
];

// Column definition
const mainColumns: Column<JournalLine>[] = [
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
		Header: 'Amount',
		accessor: 'amount',
		Cell: MoneyEditCell(),
		// @ts-expect-error
		Footer: MoneySumFooter<JournalLine>({id: 'amount'}),
	},
	{
		Header: 'GST',
		accessor: 'gst',
		Cell: MoneyEditCell<JournalLine>({
			addRowOnTabIf: (props, newValue) => !props.row.values.amount.isZero() || !newValue.isZero(),
		}),
		// @ts-expect-error
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
];

export const Main = () => {
	const [data, setData] = useState<FormValidationType>({
		text: 'some text',
		journal: {
			lines: [{name: 'Data', amount: toMoney(10), gst: toMoney(2)}],
		},
	});

	return (
		<Container>
			<TForm<FormValidationType>
				initialValues={data}
				validationSchema={formValidation}
				onSubmit={v => {
					d('Data submitted');
					d(v);
					setData(v);
				}}
			>
				{props => {
					const {values, handleSubmit, handleBlur, setFieldValue} = props;
					return (
						<Form onSubmit={handleSubmit}>
							<Form.Field width={6}>
								<label>Enter some text</label>
								<Input value={values.text} onChange={(ev, v) => setFieldValue('text', v.value)} onBlur={handleBlur('text')} />
							</Form.Field>
							<Form.Field width={6}>
								<label>Enter some data</label>
								<TableInput<JournalLine>
									name="journal.lines"
									values={values.journal.lines}
									columns={mainColumns}
									setFieldValue={setFieldValue}
									createRow={() => ({name: 'New', amount: toMoney(), gst: toMoney()})}
									tableProps={() => ({
										compact: true,
										celled: true,
										basic: 'very',
									})}
									footerCellProps={() => ({
										style: {paddingTop: '7px', paddingBottom: '7px'},
									})}
								/>
							</Form.Field>
							<Form.Button type="submit">Submit</Form.Button>
						</Form>
					);
				}}
			</TForm>
		</Container>
	);
};

export const Hover = () => {
	const [data, setData] = useState<FormValidationType>({
		text: 'some text',
		journal: {
			lines: [{name: 'Data', amount: toMoney(10), gst: toMoney(2)}],
		},
	});
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
		<Container>
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
			<TForm<FormValidationType>
				initialValues={data}
				validationSchema={formValidation}
				onSubmit={v => {
					d('Data submitted');
					d(v);
					setData(v);
				}}
			>
				{props => {
					const {values, handleSubmit, handleBlur, setFieldValue} = props;
					return (
						<Form onSubmit={handleSubmit}>
							<Form.Field width={6}>
								<label>Enter some text</label>
								<Input value={values.text} onChange={(ev, v) => setFieldValue('text', v.value)} onBlur={handleBlur('text')} />
							</Form.Field>
							<Form.Field width={12}>
								<label>Enter some data</label>
								<TableInput<JournalLine>
									name="journal.lines"
									values={values.journal.lines}
									columns={memoizedColumns}
									setFieldValue={setFieldValue}
									createRow={() => ({name: 'New', amount: toMoney(), gst: toMoney()})}
									tableProps={() => ({
										compact: true,
										celled: true,
										basic: 'very',
									})}
									footerCellProps={() => ({
										style: {paddingTop: '7px', paddingBottom: '7px'},
									})}
								/>
							</Form.Field>
							<Form.Button type="submit">Submit</Form.Button>
						</Form>
					);
				}}
			</TForm>
		</Container>
	);
};
