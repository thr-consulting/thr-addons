import {Select, TextInput} from '@mantine/core';
import {toMoney} from '@thx/money';
/* eslint-disable jsx-a11y/no-static-element-interactions */
import debug from 'debug';
import Money, {CurrencyString} from 'js-money';
import {useCallback} from 'react';
import type {MoneyInputProps} from '../MoneyInput';
import {useMoneyInput} from '../useMoneyInput';

const d = debug('thx.controls.money.MoneyCurrencyInput');

export interface MoneyCurrencyInputProps extends MoneyInputProps {
	currencies?: {value: string; label: string}[];
}

export function MoneyCurrencyInput(props: MoneyCurrencyInputProps) {
	const {prefix, defaultCurrency, onChange, showPrefix, value, wholeNumber, currencies, locked, ...rest} = props;

	const options = currencies || [
		{label: 'CAD', value: 'CAD'},
		{label: 'USD', value: 'USD'},
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
		v => {
			const newCurrencyCode = v as CurrencyString;
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
		<TextInput
			ref={inputElement}
			readOnly={locked}
			{...rest}
			rightSectionWidth={80}
			rightSection={
				<Select
					data={options}
					value={currencyCode}
					onChange={handleDropdownChange}
					disabled={locked}
					variant="unstyled"
					styles={{
						input: {
							textAlign: 'right',
							paddingRight: 36,
						},
					}}
				/>
			}
		/>
	);
}
