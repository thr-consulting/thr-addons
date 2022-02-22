import {toMoney} from '@thx/money';
import debug from 'debug';
import Inputmask from 'inputmask';
import Money from 'js-money';
import {MutableRefObject, useCallback, useEffect, useRef} from 'react';

const d = debug('thx.controls.money.useMoneyInput');

interface UseMoneyInputProps {
	value?: Money;
	onChange?: (value?: Money) => void;
	onSet?: (value?: Money) => void;
	// defaultCurrency?: Currency; // Defaults to Money.CAD
	prefix?: string; // Defaults to currency symbol
	showPrefix?: boolean; // Defaults to false
	wholeNumber?: boolean; // Defaults to false
}

type SetValueFn = (value?: Money) => void;

export function useMoneyInput(props: UseMoneyInputProps): [MutableRefObject<HTMLInputElement | null>, SetValueFn] {
	const {value, onChange, onSet, showPrefix, prefix, wholeNumber} = props;

	const inputElement = useRef<HTMLInputElement | null>(null);
	const maskInstance = useRef<Inputmask.Instance | null>(null);

	// set the adjCurrency
	// let adjCurrency = Money.CAD;
	// if (value?.currency && Money[value?.currency]) adjCurrency = Money[value?.currency];
	// if (defaultCurrency) adjCurrency = defaultCurrency;
	const currencyCode = value?.currency || 'CAD';

	useEffect(() => {
		if (!inputElement.current) throw new Error('Could not get input element');

		d('Creating input mask instance');
		maskInstance.current = new Inputmask({
			alias: 'numeric',
			groupSeparator: ',',
			digits: wholeNumber ? '0' : Money[currencyCode].decimal_digits.toString(),
			digitsOptional: false,
			prefix: showPrefix ? prefix || Money[currencyCode].symbol : undefined,
			placeholder: '0',
			autoUnmask: true,
			oncomplete() {
				if (onChange) {
					if (inputElement.current?.value) {
						onChange(toMoney(inputElement.current?.value, currencyCode));
					} else {
						onChange();
					}
				}
			},
			oncleared() {
				if (onChange) onChange();
			},
			onincomplete() {
				if (onChange) onChange(toMoney(inputElement.current?.value, currencyCode));
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currencyCode, prefix, showPrefix, wholeNumber]);

	const setVal = useCallback<SetValueFn>(
		(v?: Money) => {
			if (inputElement.current) {
				d('Value is being set:', v);
				if (v) {
					inputElement.current.value = v.toDecimal().toString();
				} else {
					inputElement.current.value = '';
				}
				onSet && onSet(v);
			}
		},
		[onSet],
	);

	// If we change the value prop we need to sync the DOM value to display the new value
	useEffect(() => {
		const whatCurrentlyIsDisplayed = inputElement.current?.value || ''; // string | undef
		const whatWeAreSetting = value ? value.toString() : ''; // money | undef

		if (whatCurrentlyIsDisplayed !== whatWeAreSetting) {
			setVal(value);
		}
	}, [setVal, value]);

	return [inputElement, setVal];
}
