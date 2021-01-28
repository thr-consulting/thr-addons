import debug from 'debug';
import type Money from 'js-money';
import React, {useState} from 'react';
import type {Column} from 'react-table';
import {moneySchemaType} from '@thx/yup-types';
import {toMoney} from '@thx/money';
import {Form, Container, Input} from 'semantic-ui-react';
import {object, string, array} from 'yup';
import {TableInput} from './TableInput';
import {TForm} from '../../form/TForm';
import {MoneyEditCell} from './MoneyEditCell';
import {StringEditCell} from './StringEditCell';
import {MoneyCell} from './MoneyCell';
import {MoneySumFooter} from './MoneySumFooter';
import {DropdownCell} from './DropdownCell';

const d = debug('thx.controls.TableInput.stories');

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

/*
	Column definition
 */
const columns: Column<JournalLine>[] = [
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
					const {values, handleSubmit, handleChange, handleBlur, setFieldValue} = props;
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
									columns={columns}
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
