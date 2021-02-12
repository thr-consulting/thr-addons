/* eslint-disable jsx-a11y/no-static-element-interactions */
import debug from 'debug';
import React, {SyntheticEvent} from 'react';
import {Dropdown, DropdownProps, Input, InputProps, Label} from 'semantic-ui-react';
import Money from 'js-money';
import {Currencies, IMoneyObject, toMoney} from '@thx/money';
import {useMoneyInput} from '../useMoneyInput';

const d = debug('thx.controls.MoneyCurrencyInput');

export interface MoneyCurrencyInputProps {
	name?: string;
	onChange?: (value: Money) => void;
	value?: Money | IMoneyObject;
	defaultCurrency?: Currencies.Currency; // Defaults to Money.CAD
	onBlur?: (ev: any) => void;
	prefix?: string; // Defaults to currency symbol
	showPrefix?: boolean; // Defaults to false
	wholeNumber?: boolean; // Defaults to false
	currencyOptions?: {key: string; value: string; text: string}[];
}

export function MoneyCurrencyInput(props: MoneyCurrencyInputProps & Omit<InputProps, 'onChange'>) {
	const {name, onBlur, prefix, defaultCurrency = Currencies.CAD, onChange, showPrefix, value, wholeNumber, currencies, ...rest} = props;
	const {inputElement} = useMoneyInput({defaultCurrency, onChange, prefix, showPrefix, value, wholeNumber});

	const options = currencies || [
		{key: 'CAD', text: 'CAD', value: 'CAD'},
		{key: 'USD', text: 'USD', value: 'USD'},
	];

	function handleChange(e: SyntheticEvent<HTMLElement, Event>, val: DropdownProps) {
		if (val.value) {
			// @ts-ignore
			onChange && onChange(toMoney(value?.amount / 100, Money[val.value]));
		}
	}

	return (
		<Input {...rest} labelPosition="right">
			<input name={name} ref={inputElement} onBlur={onBlur} />
			<Label>
				<Dropdown options={options} value={value?.currency || defaultCurrency.code} onChange={handleChange} />
			</Label>
		</Input>
	);
}
