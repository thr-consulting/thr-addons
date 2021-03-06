import debug from 'debug';
import Inputmask from 'inputmask';
import React, {useRef, useEffect} from 'react';
import {Input, InputProps} from 'semantic-ui-react';
import useDeepCompareEffect from 'use-deep-compare-effect';

const d = debug('thx.controls.inputs.MaskedInput');

/**
 * See source code for detailed prop types or {@link https://github.com/RobinHerbots/jquery.inputmask|here} for more info.
 * @typedef {Object} inputmaskPropTypes
 */

export interface MaskedInputProps {
	name?: string;
	value?: string;
	onChange?: (value?: string) => void;
	onBlur?: (event: any) => void;
	mask?: Inputmask.Options;
}

export function MaskedInput(props: MaskedInputProps & Omit<InputProps, 'onChange'>) {
	const {name, value, onChange, onBlur, mask, disabled, ...rest} = props;

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

	return (
		<Input {...rest}>
			<input disabled={disabled} name={name} ref={inputElement} onBlur={onBlur} />
		</Input>
	);
}
