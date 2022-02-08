import debug from 'debug';
import {forwardRef} from 'react';
import {MaskedInput, MaskedInputProps} from '../../inputs/MaskedInput';

const d = debug('thx.controls.date.LocalTimePicker.MaskedTimeInput');

export interface MaskedTimeInputValue {
	target: {
		value: string;
	};
}

export interface MaskedTimeInputProps {
	onChange?: (value: MaskedTimeInputValue) => void;
}

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
function MaskedTimeInputInner(props: MaskedTimeInputProps & Omit<MaskedInputProps, 'onChange'>, ref: any) {
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
