import debug from 'debug';
import {useEffect, useRef} from 'react';
import Inputmask from 'inputmask';
import Money from 'js-money';
import {Currencies, IMoneyObject, isMoneyObject, toMoney} from '@thx/money';

const d = debug('');

interface UseMoneyInputProps {
	onChange?: (value: Money) => void;
	value?: Money | IMoneyObject;
	defaultCurrency?: Currencies.Currency; // Defaults to Money.CAD
	prefix?: string; // Defaults to currency symbol
	showPrefix?: boolean; // Defaults to false
	wholeNumber?: boolean; // Defaults to false
}

export function useMoneyInput(props: UseMoneyInputProps) {
	const {value, onChange, defaultCurrency, showPrefix, prefix, wholeNumber} = props;

	const inputElement = useRef<HTMLInputElement | null>(null);
	const maskInstance = useRef<Inputmask.Instance | null>(null);

	// set the adjCurrency
	let adjCurrency = Money.CAD;
	// @ts-ignore
	if (value?.currency && Money[value?.currency]) adjCurrency = Money[value?.currency];
	if (defaultCurrency) adjCurrency = defaultCurrency;

	useEffect(() => {
		if (!inputElement.current) throw new Error('Could not get input element');

		d('Creating input mask instance');
		maskInstance.current = new Inputmask({
			alias: 'numeric',
			groupSeparator: ',',
			autoGroup: true,
			digits: wholeNumber ? '0' : Currencies[adjCurrency.code].decimal_digits.toString(),
			digitsOptional: false,
			prefix: showPrefix ? prefix || Currencies[adjCurrency.code].symbol : undefined,
			placeholder: '0',
			autoUnmask: true,
			oncomplete() {
				if (onChange) onChange(toMoney(inputElement.current?.value, adjCurrency));
			},
			oncleared() {
				if (onChange) onChange(toMoney(0, adjCurrency));
			},
			onincomplete() {
				if (onChange) onChange(toMoney(inputElement.current?.value, adjCurrency));
			},
		});
		maskInstance.current.mask(inputElement.current);

		return () => {
			if (maskInstance.current) {
				d('Cleaning up input mask instance');
				maskInstance.current.remove();
				maskInstance.current = null;
			}
		};
	}, [adjCurrency, prefix, wholeNumber]);

	// If we change the value prop we need to sync the DOM value to display the new value
	useEffect(() => {
		const inputValue = toMoney(inputElement.current?.value, adjCurrency);
		if ((value === undefined || value === null) && inputElement.current) {
			inputElement.current.value = '';
		} else if (value instanceof Money && inputElement.current) {
			if (!inputValue.equals(value)) {
				inputElement.current.value = value.toString();
			}
		} else if (isMoneyObject(value) && inputElement.current) {
			const valueInMoney = toMoney(value);
			if (!inputValue.equals(valueInMoney)) {
				inputElement.current.value = valueInMoney.toString();
			}
		} else {
			throw new Error(`Value must be a Money instance or IMoneyObject: ${value} (${typeof value}`);
		}
	}, [value, adjCurrency]);

	return {inputElement};
}
