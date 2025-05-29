import type {LocalDate} from '@js-joda/core';
import {formatDate} from '@thx/date';
import debug from 'debug';
import {useState} from 'react';
import CreditCards, {type Focused} from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {Form, Grid, Input, type InputProps} from 'semantic-ui-react';
import {MonthYearPicker} from '../../date/MonthYearPicker';
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
} & Pick<InputProps, 'disabled' | 'onBlur'>;

export function CreditCardInput(props: CreditCardInputProps) {
	const {onBlur, disabled, onChange, value} = props;
	const {name, number, cvc, expiry} = value || {};

	const [focus, setFocus] = useState<Focused>('number');

	return (
		<Grid>
			<Grid.Column width={4}>
				<Form>
					<Form.Group>
						<Form.Field width={9}>
							<label>Number</label>
							<CreditCardNumberInput
								onFocus={() => setFocus('number')}
								onBlur={onBlur}
								onChange={v => {
									onChange && onChange({name, number: v, cvc, expiry});
								}}
								disabled={disabled}
							/>
						</Form.Field>
						<Form.Field width={4}>
							<label>CVC</label>
							<Input
								value={cvc || ''}
								onChange={(ev, v) => {
									onChange && onChange({name, number, cvc: v.value, expiry});
								}}
								onFocus={() => setFocus('cvc')}
								onBlur={() => setFocus('name')}
								disabled={disabled}
							/>
						</Form.Field>
					</Form.Group>
					<Form.Group>
						<Form.Field width={9}>
							<label>Name</label>
							<Input
								value={name || ''}
								onChange={(ev, v) => {
									onChange && onChange({name: v.value, number, cvc, expiry});
								}}
								onFocus={() => setFocus('name')}
								disabled={disabled}
								fluid
							/>
						</Form.Field>
						<Form.Field width={6}>
							<label>Expiry</label>
							<MonthYearPicker
								value={expiry}
								onChange={v => {
									onChange && onChange({name, number, cvc, expiry: v});
								}}
								onFocus={() => setFocus('expiry')}
								disabled={disabled}
							/>
						</Form.Field>
					</Form.Group>
				</Form>
			</Grid.Column>
			<Grid.Column width={12}>
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
			</Grid.Column>
		</Grid>
	);
}
