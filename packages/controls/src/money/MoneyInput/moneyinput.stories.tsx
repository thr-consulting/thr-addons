import debug from 'debug';
import React, {useState} from 'react';
import Money from 'js-money';
import {Form, Container, Button, Segment} from 'semantic-ui-react';
import {formatMoney} from '@thx/money';
import {MoneyInput} from './MoneyInput';

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