import {toMoney} from '@thx/money';
/* eslint-disable jsx-a11y/no-static-element-interactions */
import debug from 'debug';
import Money, {CurrencyString} from 'js-money';
import {SyntheticEvent, useCallback, useEffect, useState} from 'react';
import {Dropdown, DropdownProps, Input, InputProps} from 'semantic-ui-react';
import CurrencyInput, {CurrencyInputProps} from 'react-currency-input-field';
import type {MoneyInputProps} from '../MoneyInput';

const d = debug('thx.controls.money.MoneyCurrencyInput');

export interface MoneyCurrencyInputProps extends MoneyInputProps {
	currencies?: {key: string; value: string; text: string}[];
	lockCurrency?: boolean;
}

export function MoneyCurrencyInput(props: MoneyCurrencyInputProps & Omit<InputProps, 'onChange'>) {
	const {name, onBlur, prefix, defaultCurrency, onChange, showPrefix, value, wholeNumber, currencies, locked, lockCurrency, ...rest} = props;
	const [localValue, setLocalValue] = useState<string | undefined>('');

	const options = currencies || [
		{key: 'CAD', text: 'CAD', value: 'CAD'},
		{key: 'USD', text: 'USD', value: 'USD'},
	];

	const currencyCode = value?.currency || defaultCurrency?.code || 'CAD';

	const handleChange: CurrencyInputProps['onValueChange'] = useCallback(
		(v): void => {
			if (onChange) {
				setLocalValue(v);
				onChange(toMoney(v || 0, defaultCurrency || 'CAD'));
			}
		},
		[defaultCurrency, onChange],
	);

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

	useEffect(() => {
		if (!localValue && value) {
			setLocalValue(value?.toDecimal().toString());
		}
	}, [localValue, value]);

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
				value={localValue}
				className="ui right labeled input"
			/>
			<Dropdown
				disabled={locked || lockCurrency}
				options={options}
				value={currencyCode}
				onChange={handleDropdownChange}
				className="ui basic label dropdown"
			/>
		</Input>
	);
}
