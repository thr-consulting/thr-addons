import debug from 'debug';
import React, {forwardRef} from 'react';
import {MaskedInput, MaskedInputProps} from '../../inputs/MaskedInput';

const d = debug('thx.controls.MaskedDateInput');

export interface MaskedDateInputProps {
	name?: string;
	onChange?: (value: {target: {value: string}}) => void;
}

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
function MaskedDateInputInner(props: MaskedDateInputProps & Omit<MaskedInputProps, 'onChange'>, ref: any) {
	const {onChange, name, ...rest} = props;

	return (
		<MaskedInput
			name={name}
			mask={{alias: 'datetime', inputFormat: 'mm/dd/yyyy'}}
			onChange={value => {
				if (onChange) onChange({target: {value: value?.toString() || ''}});
			}}
			{...rest}
		/>
	);
}

export const MaskedDateInput = forwardRef(MaskedDateInputInner);
