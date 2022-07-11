import {TextInput, TextInputProps} from '@mantine/core';
import debug from 'debug';
import {useMaskedInput, UseMaskedInputProps} from './useMaskedInput';

const d = debug('thx.controls.inputs.MaskedInput');

export type MaskedInputProps = {
	name?: string;
} & UseMaskedInputProps &
	Omit<TextInputProps, 'onChange' | 'value'>;

export function MaskedInput(props: MaskedInputProps) {
	const {name, onChange, mask, value, ...rest} = props;

	const inputRef = useMaskedInput({mask, value, onChange});

	return <TextInput name={name} ref={inputRef} {...rest} />;
}
