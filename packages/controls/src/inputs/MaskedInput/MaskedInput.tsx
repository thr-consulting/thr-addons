import debug from 'debug';
import {forwardRef, useImperativeHandle} from 'react';
import {Input, InputProps} from 'semantic-ui-react';
import {useMaskedInput, UseMaskedInputProps} from './useMaskedInput';

const d = debug('thx.controls.inputs.MaskedInput');

export interface MaskedInputRef {
	focus: () => void;
	select: () => void;
}

export type MaskedInputProps = {
	name?: string;
	onBlur?: (event: any) => void;
} & UseMaskedInputProps &
	Omit<InputProps, 'onChange'>;

export const MaskedInput = forwardRef<MaskedInputRef, MaskedInputProps>((props, ref) => {
	const {name, onBlur, disabled, onChange, mask, value, ...rest} = props;

	const inputRef = useMaskedInput({mask, value, onChange});

	useImperativeHandle(
		ref,
		() => ({
			focus: () => {
				inputRef.current?.focus();
			},
			select: () => {
				inputRef.current?.select();
			},
		}),
		[inputRef],
	);

	return (
		<Input {...rest}>
			<input disabled={disabled} name={name} ref={inputRef} onBlur={onBlur} />
		</Input>
	);
});
