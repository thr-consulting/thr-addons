/* eslint-disable jsx-a11y/no-static-element-interactions */
import debug from 'debug';
import React, {useEffect, useRef} from 'react';
import {Input, Icon, InputProps, SemanticICONS} from 'semantic-ui-react';
import Money from 'js-money';
import Inputmask from 'inputmask';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {toMoney, roundTo, Currencies, IMoneyObject, isMoneyObject} from '@thx/money';

const d = debug('thx.controls.MoneyInput');

export interface MoneyInputProps {
	name?: string;
	onChange?: (value: Money) => void;
	value?: Money | IMoneyObject;
	currency?: Currencies.Currency; // Defaults to Money.CAD
	onBlur?: (ev: any) => void;
	prefix?: string; // Defaults to currency symbol
	showPrefix?: boolean; // Defaults to false
	locked?: boolean; // Defaults to false
	onDetailsClicked?: () => void; // Defaults to no handler
	detailsIcon?: SemanticICONS; // Defaults to 'server'
	wholeNumber?: boolean; // Defaults to false
}

export function MoneyInput(props: MoneyInputProps & Omit<InputProps, 'onChange'>) {
	const {name, value, onChange, currency, onBlur, showPrefix, prefix, locked, onDetailsClicked, detailsIcon, wholeNumber, ...rest} = props;

	const inputElement = useRef<HTMLInputElement | null>(null);
	const maskInstance = useRef<Inputmask.Instance | null>(null);

	const adjCurrency = currency || Money.CAD;

	useDeepCompareEffect(() => {
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

	const details = onDetailsClicked ? (
		<Icon name={detailsIcon || 'server'} color={locked ? 'blue' : undefined} title="Details" onClick={onDetailsClicked} link />
	) : null;

	return (
		<Input icon={!!onDetailsClicked} {...rest}>
			<input name={name} ref={inputElement} onBlur={onBlur} readOnly={locked} />
			{details}
		</Input>
	);
}
