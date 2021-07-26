import {TextField} from '@material-ui/core';
import type {TextFieldProps} from '@material-ui/core';
import debug from 'debug';
import Inputmask from 'inputmask';
import React, {useEffect, useRef} from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

const d = debug('thx.controls-materialui.inputs.MaskedInput');

interface IMaskedInputProps {
	onChange?: (value?: string) => void;
	value?: string;
	mask?: Inputmask.Options;
}

export type MaskedInputProps = IMaskedInputProps & Omit<TextFieldProps, 'onChange' | 'value'>;

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

	return <TextField inputRef={inputElement} {...rest} />;
}
