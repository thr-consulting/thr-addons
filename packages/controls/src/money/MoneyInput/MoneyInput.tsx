import {toMoney} from '@thx/money';
import type {TextInputProps} from '@mantine/core';
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {TextInput} from '@mantine/core';
import debug from 'debug';
import Money, {Currency, MoneyObject} from 'js-money';
import {useCallback} from 'react';
import {useMoneyInput} from '../useMoneyInput';

const d = debug('thx.controls.money.MoneyInput');

export interface MoneyInputOnlyProps {
	onChange?: (value: Money) => void;
	value?: Money | MoneyObject;
	defaultCurrency?: Currency; // Defaults to Money.CAD
	prefix?: string; // Defaults to currency symbol
	showPrefix?: boolean; // Defaults to false
	locked?: boolean; // Defaults to false
	wholeNumber?: boolean; // Defaults to false
}

export type MoneyInputProps = MoneyInputOnlyProps & Omit<TextInputProps, 'onChange' | 'value'>;

export function MoneyInput(props: MoneyInputProps) {
	const {locked, prefix, defaultCurrency, onChange, showPrefix, value, wholeNumber, ...rest} = props;

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

	return <TextInput ref={inputElement} readOnly={locked} {...rest} />;
}
