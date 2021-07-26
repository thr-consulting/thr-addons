import {TextInput} from 'carbon-components-react';
import type {TextInputProps} from 'carbon-components-react';
import debug from 'debug';
import Inputmask from 'inputmask';
import React, {useEffect, useRef} from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

const d = debug('thx.controls-carbon.inputs.MaskedInput');

interface IMaskedInputProps {
	onChange?: (value?: string) => void;
	value?: string;
	mask?: Inputmask.Options;
}

export type MaskedInputProps = IMaskedInputProps & Omit<TextInputProps, 'onChange' | 'value'>;

export function MaskedInput(props: MaskedInputProps) {
	const {mask, value, onChange, ...rest} = props;

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
		d(inputElement.current);
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
		}
	}, [value]);

	return <TextInput ref={inputElement} {...rest} />;
}
