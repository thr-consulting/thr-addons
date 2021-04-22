/* eslint-disable jsx-a11y/no-static-element-interactions */
import debug from 'debug';
import React, {SyntheticEvent} from 'react';
import {Dropdown, DropdownProps, Input, InputProps, Label} from 'semantic-ui-react';
import Money from 'js-money';
import {toMoney} from '@thx/money';
import {useMoneyInput} from '../useMoneyInput';
import type {MoneyInputProps} from '../MoneyInput';

const d = debug('thx.controls.MoneyCurrencyInput');

export interface MoneyCurrencyInputProps extends MoneyInputProps {
	currencyOptions?: {key: string; value: string; text: string}[];
}

export function MoneyCurrencyInput(props: MoneyCurrencyInputProps & Omit<InputProps, 'onChange'>) {
	const {name, onBlur, prefix, defaultCurrency, onChange, showPrefix, value, wholeNumber, currencies, locked, ...rest} = props;
	const {inputElement} = useMoneyInput({defaultCurrency, onChange, prefix, showPrefix, value, wholeNumber});

	const options = currencies || [
		{key: 'CAD', text: 'CAD', value: 'CAD'},
		{key: 'USD', text: 'USD', value: 'USD'},
	];

	function handleDropdownChange(e: SyntheticEvent<HTMLElement, Event>, val: DropdownProps) {
		// @ts-ignore DONT DELETE THE ** IT IS AN OPERATOR MEANING POWER/EXPONENT
		if (val.value && onChange) onChange(toMoney(value.amount / 10 ** Money[value.currency].decimal_digits, Money[val.value]));
	}

	return (
		<Input {...rest} labelPosition="right">
			<input name={name} ref={inputElement} onBlur={onBlur} readOnly={locked} />
			<Label>
				<Dropdown disabled={locked} options={options} value={value?.currency || defaultCurrency?.code || 'CAD'} onChange={handleDropdownChange} />
			</Label>
		</Input>
	);
}
