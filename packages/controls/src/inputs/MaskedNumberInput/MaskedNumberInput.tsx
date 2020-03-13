import debug from 'debug';
import React from 'react';
import Inputmask from 'inputmask';
import {MaskedInput} from '../MaskedInput';

const d = debug('thx.controls.MaskedNumberInput');

export interface MaskedNumberInputProps {
	name?: string;
	value?: number;
	onChange?: (value?: number) => void;
	onBlur?: (event: any) => void;
	mask?: Inputmask.Options;
}

export function MaskedNumberInput(props: MaskedNumberInputProps) {
	const {value, onChange, mask, ...rest} = props;

	const handleChange = (val: string | undefined) => {
		if (onChange) onChange(parseFloat(val || ''));
	};

	return <MaskedInput onChange={handleChange} value={value?.toString()} {...rest} mask={{...mask, autoUnmask: true}} />;
}
