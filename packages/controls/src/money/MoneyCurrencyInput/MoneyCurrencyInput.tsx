import {toMoney} from '@thx/money';
/* eslint-disable jsx-a11y/no-static-element-interactions */
import debug from 'debug';
import Money, {CurrencyString} from 'js-money';
import React, {SyntheticEvent, useCallback} from 'react';
import {Dropdown, DropdownProps, Input, InputProps, Label} from 'semantic-ui-react';
import type {MoneyInputProps} from '../MoneyInput';
import {useMoneyInput} from '../useMoneyInput';

const d = debug('thx.controls.money.MoneyCurrencyInput');

export interface MoneyCurrencyInputProps extends MoneyInputProps {
	currencies?: {key: string; value: string; text: string}[];
}

export function MoneyCurrencyInput(props: MoneyCurrencyInputProps & Omit<InputProps, 'onChange'>) {
	const {name, onBlur, prefix, defaultCurrency, onChange, showPrefix, value, wholeNumber, currencies, locked, ...rest} = props;

	const options = currencies || [
		{key: 'CAD', text: 'CAD', value: 'CAD'},
		{key: 'USD', text: 'USD', value: 'USD'},
	];

	const handleChange = useCallback(
		(v?: Money) => {
			if (!v) {
				onChange && onChange(toMoney(0, defaultCurrency));
			} else {
				onChange && onChange(v);
			}
		},
		[defaultCurrency, onChange],
	);

	const val = !(value instanceof Money) && value !== undefined ? toMoney(value) : value;

	const [inputElement] = useMoneyInput({onChange: handleChange, prefix, showPrefix, value: val, wholeNumber});

	const handleDropdownChange = useCallback(
		(e: SyntheticEvent<HTMLElement, Event>, v: DropdownProps) => {
			const newCurrencyCode = v.value as CurrencyString;
			const newMoney = new Money(value?.amount || 0, newCurrencyCode);

			d('Change', value, newCurrencyCode, newMoney);
			// setInputValue(newMoney);
			onChange && onChange(newMoney);
			// forceUpdate();
		},
		[onChange, value],
	);

	const currencyCode = value?.currency || defaultCurrency?.code || 'CAD';
	d('Render', value, currencyCode);

	return (
		<Input {...rest} labelPosition="right">
			<input name={name} ref={inputElement} onBlur={onBlur} readOnly={locked} />
			<Label basic>
				<Dropdown disabled={locked} options={options} value={currencyCode} onChange={handleDropdownChange} />
			</Label>
		</Input>
	);
}
