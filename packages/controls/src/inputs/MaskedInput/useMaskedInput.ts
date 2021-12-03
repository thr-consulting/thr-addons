import debug from 'debug';
import Inputmask from 'inputmask';
import {useEffect, useRef} from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

const d = debug('thx.controls.inputs.MaskedInput.useMaskedInput');

export interface UseMaskedInputProps {
	value?: string;
	onChange?: (value?: string) => void;
	mask?: Inputmask.Options;
	onSet?: (value?: string) => void;
}

export function useMaskedInput(props: UseMaskedInputProps) {
	const {value, onChange, onSet, mask} = props;

	const inputElement = useRef<HTMLInputElement | null>(null);
	const maskInstance = useRef<Inputmask.Instance | null>(null);

	useDeepCompareEffect(() => {
		if (!inputElement.current) throw new Error('Could not get input element');

		d('Creating input mask instance');
		maskInstance.current = new Inputmask({
			...mask,
			oncomplete() {
				if (onChange) onChange(inputElement.current?.value);
				if (mask?.oncomplete) mask.oncomplete();
			},
			oncleared() {
				if (onChange) onChange();
				if (mask?.oncleared) mask.oncleared();
			},
			onincomplete() {
				if (onChange) onChange(inputElement.current?.value);
				if (mask?.onincomplete) mask.onincomplete();
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
	}, [mask]);

	// If we change the value prop we need to sync the DOM value to display the new value
	useEffect(() => {
		if (inputElement.current && inputElement.current?.value !== value && value !== undefined) {
			d('Value is changing:', value);
			inputElement.current.value = value;
			onSet && onSet(value);
		}
	}, [value]);

	return inputElement;
}
