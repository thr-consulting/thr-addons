import debug from 'debug';
import React, {useRef, useEffect, forwardRef, useState} from 'react';
import {Input} from '@fluentui/react-northstar';
import type {InputProps} from '@fluentui/react-northstar';
import 'inputmask/dist/inputmask/inputmask.numeric.extensions';
import Inputmask from 'inputmask';
import useDeepCompareEffect from 'use-deep-compare-effect';

const d = debug('thx.controls.MaskedInput');

/**
 * See source code for detailed prop types or {@link https://github.com/RobinHerbots/jquery.inputmask|here} for more info.
 * @typedef {Object} inputmaskPropTypes
 */

interface CustomMaskedInputProps {
	value?: string;
	onChange?: (value?: string) => void;
	mask?: Inputmask.Options;
}
export type MaskedInputProps = CustomMaskedInputProps & Omit<InputProps, 'onChange' | 'value' | 'inputRef'>;

export function MaskedInput(props: MaskedInputProps) {
	const {value, onChange, mask, ...rest} = props;

	const inputElement = useRef<HTMLInputElement | null>(null);
	const maskInstance = useRef<Inputmask.Instance | null>(null);
	const [inputValue, setInputValue] = useState<string | undefined>();

	useDeepCompareEffect(() => {
		if (!inputElement.current) throw new Error('Could not get input element');

		d('Creating input mask instance');
		maskInstance.current = new Inputmask({
			...mask,
			oncomplete() {
				d(`Input complete: ${inputElement.current?.value}`);
				if (onChange) onChange(inputElement.current?.value);
				if (mask?.oncomplete) mask.oncomplete();
			},
			oncleared() {
				d('Input cleared');
				if (onChange) onChange();
				if (mask?.oncleared) mask.oncleared();
			},
			// This doesn't really make sense so i'm commenting it out - MK
			// Why should the input fire onChange if the value is only half-entered in?
			// onincomplete() {
			// 	d(`Input incomplete: ${inputElement.current?.value}`);
			// 	if (onChange) onChange(inputElement.current?.value);
			// 	if (mask?.onincomplete) mask.onincomplete();
			// },
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

	// If we change the value prop we need to update the input value
	useEffect(() => {
		if (inputElement.current && inputElement.current?.value !== value && value !== undefined) {
			d('Value is changing:', value);
			setInputValue(value);
		}
	}, [value]);

	// @ts-ignore
	return <Input {...rest} value={inputValue} onChange={(ev, v) => setInputValue(v?.value)} inputRef={inputElement} />;
}
