import debug from 'debug';
import {TextInput, TextInputProps} from '@mantine/core';
import {useMaskedInput, UseMaskedInputProps} from './useMaskedInput';

const d = debug('thx.controls.inputs.MaskedInput');

export type MaskedInputProps = {
	name?: string;
} & UseMaskedInputProps &
	TextInputProps;

export function MaskedInput(props: MaskedInputProps) {
	const {name, onChange, mask, value, ...rest} = props;

	const inputRef = useMaskedInput({mask, value, onChange});

	return <TextInput name={name} ref={inputRef} {...rest} />;
}
