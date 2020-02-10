/* eslint-disable jsx-a11y/no-static-element-interactions */
import debug from 'debug';
import React, {useEffect, useRef} from 'react';
import {Input, Icon, InputProps, SemanticICONS} from 'semantic-ui-react';
import Money from 'js-money';
import Inputmask from 'inputmask';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {toMoney, roundTo, Currencies} from '@thx/money';

const d = debug('thx.controls.MoneyInput');

export interface MoneyInputProps {
	onChange?: (value: Money) => void;
	value?: Money;
	currency?: Currencies.Currency; // Defaults to Money.CAD
	onBlur?: () => void;
	prefix?: string; // Defaults to currency symbol
	showPrefix?: boolean; // Defaults to false
	locked?: boolean; // Defaults to false
	onDetailsClicked?: () => void; // Defaults to no handler
	detailsIcon?: SemanticICONS; // Defaults to 'server'
	wholeNumber?: boolean; // Defaults to false
}

export function MoneyInput(props: MoneyInputProps & Omit<InputProps, 'onChange'>) {
	const {
		value,
		onChange,
		currency,
		onBlur,
		showPrefix,
		prefix,
		locked,
		onDetailsClicked,
		detailsIcon,
		wholeNumber,
		...rest
	} = props;

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
		const adjValue = parseFloat(value?.toString() || '0').toString();
		const adjInputElementValue = parseFloat(inputElement.current?.value || '0').toString();
		const isZeroValue = parseFloat(value?.toString() || '0') === 0;
		if (inputElement.current && adjValue !== adjInputElementValue && !isZeroValue) {
			d('Value is changing:', adjValue, adjInputElementValue, isZeroValue);
			inputElement.current.value = value?.toString() || '';
		}
	}, [value, adjCurrency]);

	const details = onDetailsClicked ? (
		<Icon
			name={detailsIcon || 'server'}
			color={locked ? 'blue' : undefined}
			title="Details"
			onClick={onDetailsClicked}
			link
		/>
	) : null;

	return (
		<Input icon={!!onDetailsClicked} {...rest}>
			<input ref={inputElement} onBlur={onBlur} readOnly={locked} />
			{details}
		</Input>
	);
}
