import {toMoney} from '@thx/money';
import debug from 'debug';
import Money, {Currency, MoneyObject} from 'js-money';
import React, {useCallback} from 'react';
import {Input, InputProps} from 'semantic-ui-react';
import {useMoneyInput} from '../useMoneyInput';

const d = debug('thx.controls.money.MoneyInput');

export interface MoneyInputProps {
	name?: string;
	onChange?: (value: Money) => void;
	value?: Money | MoneyObject;
	defaultCurrency?: Currency; // Defaults to Money.CAD
	onBlur?: (ev: any) => void;
	prefix?: string; // Defaults to currency symbol
	showPrefix?: boolean; // Defaults to false
	locked?: boolean; // Defaults to false
	wholeNumber?: boolean; // Defaults to false
}

export function MoneyInput(props: MoneyInputProps & Omit<InputProps, 'onChange'>) {
	const {name, onBlur, locked, prefix, defaultCurrency, onChange, showPrefix, value, wholeNumber, ...rest} = props;

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

	return (
		<Input {...rest}>
			<input name={name} ref={inputElement} onBlur={onBlur} readOnly={locked} />
		</Input>
	);
}
