import debug from 'debug';
import React, {forwardRef} from 'react';
import {MaskedInput} from '../../inputs/MaskedInput';
import type {MaskedInputProps} from '../../inputs/MaskedInput';

const d = debug('thx.controls.MaskedDateInput');

interface CustomMaskedDateInputProps {
	onChange?: (value: {target: {value: string}}) => void;
}
export type MaskedDateInputProps = CustomMaskedDateInputProps & Omit<MaskedInputProps, 'onChange'>;

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
function MaskedDateInputInner(props: MaskedDateInputProps, ref: any) {
	const {onChange, ...rest} = props;

	return (
		<MaskedInput
			mask={{alias: 'datetime', inputFormat: 'mm/dd/yyyy'}}
			onChange={(value) => {
				d(`MaskedInput onChange: ${value}`);
				if (onChange) onChange({target: {value: value || ''}});
			}}
			{...rest}
		/>
	);
}

export const MaskedDateInput = forwardRef(MaskedDateInputInner);
