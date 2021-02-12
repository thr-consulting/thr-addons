/* eslint-disable jsx-a11y/no-static-element-interactions */
import debug from 'debug';
import React from 'react';
import {Input, InputProps} from 'semantic-ui-react';
import type Money from 'js-money';
import type {Currencies, IMoneyObject} from '@thx/money';
import {useMoneyInput} from '../useMoneyInput';

const d = debug('thx.controls.MoneyInput');

export interface MoneyInputProps {
	name?: string;
	onChange?: (value: Money) => void;
	value?: Money | IMoneyObject;
	defaultCurrency?: Currencies.Currency; // Defaults to Money.CAD
	onBlur?: (ev: any) => void;
	prefix?: string; // Defaults to currency symbol
	showPrefix?: boolean; // Defaults to false
	locked?: boolean; // Defaults to false
	wholeNumber?: boolean; // Defaults to false
}

export function MoneyInput(props: MoneyInputProps & Omit<InputProps, 'onChange'>) {
	const {name, onBlur, locked, prefix, defaultCurrency, onChange, showPrefix, value, wholeNumber, ...rest} = props;
	const {inputElement} = useMoneyInput({defaultCurrency, onChange, prefix, showPrefix, value, wholeNumber});

	return (
		<Input {...rest}>
			<input name={name} ref={inputElement} onBlur={onBlur} readOnly={locked} />
		</Input>
	);
}
