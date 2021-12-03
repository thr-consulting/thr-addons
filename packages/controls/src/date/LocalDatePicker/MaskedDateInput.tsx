import debug from 'debug';
import React, {forwardRef} from 'react';
import {MaskedInput, MaskedInputProps} from '../../inputs/MaskedInput';

const d = debug('thx.controls.date.LocalDatePicker.MaskedDateInput');

export interface MaskedDateInputValue {
	target: {
		value: string;
	};
}

export interface MaskedDateInputProps {
	name?: string;
	onChange?: (value: MaskedDateInputValue) => void;
}

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
function MaskedDateInputInner(props: MaskedDateInputProps & Omit<MaskedInputProps, 'onChange'>, ref: any) {
	const {onChange, name, ...rest} = props;

	return (
		<MaskedInput
			{...rest}
			name={name}
			mask={{alias: 'datetime', inputFormat: 'mm/dd/yyyy'}}
			onChange={value => {
				if (onChange) onChange({target: {value: value || ''}});
			}}
		/>
	);
}

export const MaskedDateInput = forwardRef(MaskedDateInputInner);
