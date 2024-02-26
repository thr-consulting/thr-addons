import debug from 'debug';
import {forwardRef} from 'react';
import {MaskedInput, MaskedInputProps} from '../../inputs/MaskedInput';
import type {MaskedInputRef} from '../../inputs/MaskedInput/MaskedInput';

const d = debug('thx.controls.date.LocalDatePicker.MaskedDateInput');

export type MaskedDateInputRef = MaskedInputRef;

export interface MaskedDateInputValue {
	target: {
		value: string;
	};
}

export interface MaskedDateInputProps {
	name?: string;
	onChange?: (value: MaskedDateInputValue) => void;
}

export const MaskedDateInput = forwardRef<MaskedDateInputRef, MaskedDateInputProps & Omit<MaskedInputProps, 'onChange'>>((props, ref) => {
	const {onChange, name, ...rest} = props;

	return (
		<MaskedInput
			{...rest}
			ref={ref}
			name={name}
			mask={{alias: 'datetime', inputFormat: 'mm/dd/yyyy'}}
			onChange={(value: string) => {
				if (onChange) onChange({target: {value: value || ''}});
			}}
		/>
	);
});
