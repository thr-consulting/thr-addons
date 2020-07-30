import debug from 'debug';
import React, {forwardRef} from 'react';
import {MaskedInput, MaskedInputProps} from '../../inputs/MaskedInput';

const d = debug('thx.controls.MaskedTimeInput');

export interface CustomMaskedTimeInputProps {
	onChange?: (value: {target: {value: string}}) => void;
}

export type MaskedTimeInputProps = CustomMaskedTimeInputProps & Omit<MaskedInputProps, 'onChange'>;

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
function MaskedTimeInputInner(props: MaskedTimeInputProps, ref: any) {
	const {onChange, ...rest} = props;

	return (
		<MaskedInput
			mask={{alias: 'datetime', inputFormat: 'hh:MM TT'}}
			onChange={value => {
				if (onChange) onChange({target: {value: value || ''}});
			}}
			{...rest}
		/>
	);
}

export const MaskedTimeInput = forwardRef(MaskedTimeInputInner);
