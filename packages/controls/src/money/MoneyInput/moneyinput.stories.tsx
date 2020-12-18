import debug from 'debug';
import React, {useState} from 'react';
import Money from 'js-money';
import {Form, Container, Button, Segment, Radio} from 'semantic-ui-react';
import {formatMoney} from '@thx/money';
import {moneySchemaType} from '@thx/yup-types';
import {InferType, object} from 'yup';
import {MoneyInput} from './MoneyInput';
import {TForm} from '../../form/TForm';

const d = debug('thx.controls.MoneyInput.stories');

export default {title: 'MoneyInput'};

export const Main = () => {
	const [shown, setShown] = useState(true);
	const [state, setState] = useState({
		cad: new Money(0, Money.CAD),
		tnd: new Money(0, Money.TND),
		whole: new Money(0, Money.CAD),
	});

	if (!shown) {
		return (
			<Container>
				<Button onClick={() => setShown(true)}>Show</Button>
			</Container>
		);
	}

	return (
		<Container>
			<Segment basic>
				<Form>
					<Form.Field inline width={6}>
						<label>Masked Input: CAD</label>
						<MoneyInput
							onChange={v => {
								d('onChange', v);
								setState(s => ({...s, cad: v}));
							}}
							onBlur={() => {
								d('onBlur');
							}}
							value={state.cad}
						/>
					</Form.Field>
					<Form.Field inline width={6}>
						<label>Masked Input: TND</label>
						<MoneyInput
							onChange={v => {
								setState(s => ({...s, tnd: v}));
							}}
							value={state.tnd}
							currency={Money.TND}
							showPrefix
						/>
					</Form.Field>
					<Form.Field inline width={6}>
						<label>Masked Input: Locked</label>
						<MoneyInput value={new Money(10101, Money.CAD)} locked />
					</Form.Field>
					<Form.Field inline width={6}>
						<label>Masked Input: Details</label>
						<MoneyInput
							value={new Money(10101, Money.CAD)}
							onDetailsClicked={() => {
								d('Details Clicked');
							}}
						/>
					</Form.Field>
					<Form.Field inline width={6}>
						<label>Masked Input: Whole Number</label>
						<MoneyInput
							value={state.whole}
							onChange={v => {
								setState(s => ({...s, whole: v}));
							}}
							wholeNumber
						/>
					</Form.Field>
				</Form>
			</Segment>
			<Segment basic>
				<Button
					onClick={() => {
						setState({
							cad: new Money(4205, Money.CAD),
							tnd: new Money(4205, Money.TND),
							whole: new Money(4205, Money.CAD),
						});
					}}
				>
					Set value
				</Button>
				<Button onClick={() => setShown(false)}>Hide</Button>
			</Segment>
			<Segment>
				<p>CAD is: {formatMoney(state.cad, true)}</p>
				<p>TND is: {formatMoney(state.tnd, true)}</p>
				<p>WholeNumber is: {formatMoney(state.whole, true)}</p>
			</Segment>
		</Container>
	);
};

const formValidation = object().shape({
	money: moneySchemaType().required(),
});
type FormValidationType = InferType<typeof formValidation>;

export const WithTForm = () => (
	<Container>
		<TForm<FormValidationType> initialValues={{money: {amount: 0, currency: 'CAD'}}} validationSchema={formValidation} onSubmit={() => {}}>
			{props => {
				const {values, handleSubmit, handleBlur, setFieldValue} = props;

				return (
					<Form onSubmit={handleSubmit}>
						<Form.Field width={6}>
							<label>Enter some value</label>
							<MoneyInput name="money" value={values.money} onChange={v => setFieldValue('money', v)} onBlur={handleBlur} />
						</Form.Field>
						<Form.Button type="submit">Submit</Form.Button>
					</Form>
				);
			}}
		</TForm>
	</Container>
);

export const WithIMoneyObject = () => {
	const [state, setState] = useState({amount: 506, currency: 'CAD'});

	return (
		<Container>
			<Segment basic>
				<Form>
					<Form.Field inline width={6}>
						<label>Not Money</label>
						<MoneyInput
							value={state}
							onChange={v => {
								d(v);
								setState(v);
							}}
						/>
					</Form.Field>
				</Form>
			</Segment>
		</Container>
	);
};

export const WithUndefinedValue = () => (
	<Container>
		<Form.Field width={6}>
			<label>Enter some value</label>
			<MoneyInput name="money" value={undefined} />
		</Form.Field>
	</Container>
);
