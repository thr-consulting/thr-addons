import debug from 'debug';
import React, {forwardRef} from 'react';
import {MaskedInput, MaskedInputProps} from '../../inputs/MaskedInput';

const d = debug('thx.controls.MaskedTimeInput');

export interface MaskedTimeInputProps {
	onChange?: (value: {target: {value: string}}) => void;
}

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
function MaskedTimeInputInner(props: MaskedTimeInputProps & Omit<MaskedInputProps, 'onChange'>, ref: any) {
	const {onChange, ...rest} = props;

	return (
		<MaskedInput
			mask={{alias: 'datetime', inputFormat: 'hh:MM TT'}}
			onChange={value => {
				if (onChange) onChange({target: {value: value?.toString() || ''}});
			}}
			{...rest}
		/>
	);
}

export const MaskedTimeInput = forwardRef(MaskedTimeInputInner);
