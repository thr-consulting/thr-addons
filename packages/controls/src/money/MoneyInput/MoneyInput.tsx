import {toMoney} from '@thx/money';
import debug from 'debug';
import type {Currency} from 'js-money';
import type Money from 'js-money';
import {useCallback} from 'react';
import CurrencyInput, {CurrencyInputProps} from 'react-currency-input-field';
import {Input, InputProps} from 'semantic-ui-react';

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

	const handleChange: CurrencyInputProps['onValueChange'] = useCallback(
		(v): void => {
			if (onChange) {
				onChange(toMoney(v || 0, defaultCurrency || 'CAD'));
			}
		},
		[defaultCurrency, onChange],
	);

	return (
		<Input {...rest}>
			<CurrencyInput
				name={name}
				disabled={locked}
				placeholder="0.00"
				decimalsLimit={wholeNumber ? -1 : 2}
				prefix={showPrefix ? prefix || '$' : undefined}
				onValueChange={handleChange}
				style={{textAlign: 'right'}}
				onBlur={onBlur}
				value={value?.toDecimal() || 0}
			/>
		</Input>
	);
}
