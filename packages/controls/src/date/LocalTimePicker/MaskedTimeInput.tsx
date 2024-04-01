import debug from 'debug';
import {forwardRef} from 'react';
import {MaskedInput, MaskedInputProps} from '../../inputs/MaskedInput';
import type {MaskedInputRef} from '../../inputs/MaskedInput/MaskedInput';

const d = debug('thx.controls.date.LocalTimePicker.MaskedTimeInput');

export type MaskedTimeInputRef = MaskedInputRef;

export interface MaskedTimeInputValue {
	target: {
		value: string;
	};
}

export interface MaskedTimeInputProps {
	onChange?: (value: MaskedTimeInputValue) => void;
}

export const MaskedTimeInput = forwardRef<MaskedTimeInputRef, MaskedTimeInputProps & Omit<MaskedInputProps, 'onChange'>>(
	(props: MaskedTimeInputProps & Omit<MaskedInputProps, 'onChange'>, ref: any) => {
		const {onChange, name, ...rest} = props;

		return (
			<MaskedInput
				{...rest}
				ref={ref}
				name={name}
				mask={{alias: 'datetime', inputFormat: 'hh:MM TT'}}
				onChange={(value: string) => {
					if (onChange) onChange({target: {value: value || ''}});
				}}
			/>
		);
	},
);
