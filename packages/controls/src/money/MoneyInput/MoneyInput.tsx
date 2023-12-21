import debug from 'debug';
import type {Currency} from 'js-money';
import type Money from 'js-money';
import {Input, InputProps} from 'semantic-ui-react';
import CurrencyInput, {CurrencyInputProps} from 'react-currency-input-field';
import {useCallback, useEffect, useState} from 'react';
import {formatMoney, toMoney} from '@thx/money';

const d = debug('thx.controls.money.MoneyInput');

export interface MoneyInputProps {
	name?: string;
	onChange?: (value?: Money) => void;
	value?: Money | undefined;
	defaultCurrency?: Currency; // Defaults to Money.CAD
	onBlur?: (ev: any) => void;
	prefix?: string; // Defaults to currency symbol
	showPrefix?: boolean; // Defaults to false
	locked?: boolean; // Defaults to false
	wholeNumber?: boolean; // Defaults to false
}

export function MoneyInput(props: MoneyInputProps & Omit<InputProps, 'onChange'>) {
	const {name, onBlur, locked, prefix, defaultCurrency, onChange, showPrefix, value, wholeNumber, ...rest} = props;
	const [localValue, setLocalValue] = useState<string | undefined>('');

	const handleChange: CurrencyInputProps['onValueChange'] = useCallback(
		(v): void => {
			if (onChange) {
				setLocalValue(v);
				onChange(toMoney(v || 0, defaultCurrency || 'CAD'));
			}
		},
		[defaultCurrency, onChange],
	);

	useEffect(() => {
		setLocalValue(formatMoney(value) || '0.00');
	}, [localValue, value]);

	return (
		<Input {...rest}>
			{value?.toString()}
			<CurrencyInput
				name={name}
				disabled={locked}
				placeholder="0.00"
				decimalsLimit={wholeNumber ? -1 : 2}
				prefix={showPrefix ? prefix || '$' : undefined}
				onValueChange={handleChange}
				style={{textAlign: 'right'}}
				onBlur={onBlur}
				value={localValue}
			/>
		</Input>
	);
}
