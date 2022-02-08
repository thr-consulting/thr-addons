import debug from 'debug';
import {Input, InputProps} from 'semantic-ui-react';
import {useMaskedInput, UseMaskedInputProps} from './useMaskedInput';

const d = debug('thx.controls.inputs.MaskedInput');

export type MaskedInputProps = {
	name?: string;
	onBlur?: (event: any) => void;
} & UseMaskedInputProps &
	Omit<InputProps, 'onChange'>;

export function MaskedInput(props: MaskedInputProps) {
	const {name, onBlur, disabled, onChange, mask, value, ...rest} = props;

	const inputRef = useMaskedInput({mask, value, onChange});

	return (
		<Input {...rest}>
			<input disabled={disabled} name={name} ref={inputRef} onBlur={onBlur} />
		</Input>
	);
}
