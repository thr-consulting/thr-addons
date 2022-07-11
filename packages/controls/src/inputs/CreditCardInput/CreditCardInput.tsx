import type {LocalDate} from '@js-joda/core';
import {Grid, TextInput} from '@mantine/core';
import {formatDate} from '@thx/date';
import debug from 'debug';
import {useState} from 'react';
import CreditCards, {Focused} from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {MonthYearPicker} from '../../date/MonthYearPicker';
import {MaskedInput} from '../MaskedInput';
import {CreditCardNumberInput} from './CreditCardNumberInput';
import './styles.css';

const d = debug('thx.controls.inputs.CreditCardInput');

export interface CreditCardData {
	number?: string;
	name?: string;
	cvc?: string;
	expiry?: LocalDate;
}

export type CreditCardInputProps = {
	value?: CreditCardData;
	onChange?: (data: CreditCardData) => void;
	disabled?: boolean;
	showCard?: boolean;
};

export function CreditCardInput(props: CreditCardInputProps) {
	const {disabled, onChange, value, showCard} = props;
	const {name, number, cvc, expiry} = value || {};

	const [focus, setFocus] = useState<Focused>('number');

	const card = showCard ? (
		<Grid.Col span={12}>
			<CreditCards
				cvc={cvc || ''}
				expiry={formatDate(expiry, {format: 'MMuu'}) || ''}
				name={name || ''}
				number={number || ''}
				focused={focus}
				callback={(a, b) => {
					d(a, b);
				}}
			/>
		</Grid.Col>
	) : null;

	return (
		<Grid>
			<Grid.Col span={8}>
				<CreditCardNumberInput
					onFocus={() => setFocus('number')}
					onChange={v => {
						onChange && onChange({name, number: v, cvc, expiry});
					}}
					disabled={disabled}
					label="Number"
				/>
			</Grid.Col>
			<Grid.Col span={4}>
				<MaskedInput
					label="CVC"
					mask={{mask: '(999|9999)'}}
					value={cvc || ''}
					onChange={val => {
						onChange && onChange({name, number, cvc: val, expiry});
					}}
					onFocus={() => setFocus('cvc')}
					onBlur={() => setFocus('name')}
					disabled={disabled}
					sx={{maxWidth: 70}}
				/>
			</Grid.Col>
			<Grid.Col span={8}>
				<TextInput
					label="Name"
					value={name || ''}
					onChange={ev => {
						onChange && onChange({name: ev.target.value, number, cvc, expiry});
					}}
					onFocus={() => setFocus('name')}
					disabled={disabled}
				/>
			</Grid.Col>
			<Grid.Col span={4}>
				<MonthYearPicker
					label="Expiry"
					value={expiry}
					onChange={v => {
						onChange && onChange({name, number, cvc, expiry: v || undefined});
					}}
					onFocus={() => setFocus('expiry')}
					disabled={disabled}
				/>
			</Grid.Col>
			{card}
		</Grid>
	);
}
