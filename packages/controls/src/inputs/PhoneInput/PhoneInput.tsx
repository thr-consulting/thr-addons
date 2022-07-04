import debug from 'debug';
import {MaskedInput, MaskedInputProps} from '../MaskedInput';

const d = debug('thx.controls.inputs.PhoneInput');

export interface PhoneInputProps extends Omit<MaskedInputProps, 'mask'> {
	extension?: boolean;
}

export function PhoneInput(props: PhoneInputProps & Omit<MaskedInputProps, 'mask' | 'onChange'>) {
	const {extension, ...rest} = props;
	const mask = {
		mask: extension ? '((999) 999-9999[ x9999])|(+9 (999) 999-9999[ x9999])' : '((999) 999-9999)|( +9 (999) 999-9999)',
		greedy: false,
		autoUnmask: true,
	};

	return <MaskedInput {...rest} mask={mask} />;
}
