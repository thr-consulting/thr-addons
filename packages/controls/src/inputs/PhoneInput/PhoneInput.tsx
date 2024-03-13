import debug from 'debug';
import {Input} from 'semantic-ui-react';
import {MaskedInput, MaskedInputProps} from '../MaskedInput';

const d = debug('thx.controls.inputs.PhoneInput');

export interface PhoneInputProps {
	extension?: boolean;
	onChange?: (value?: string) => void;
}

export function PhoneInput(props: PhoneInputProps & Omit<MaskedInputProps, 'mask' | 'onChange'>) {
	const {
		value,
		as,
		action,
		actionPosition,
		className,
		error,
		fluid,
		focus,
		inverted,
		label,
		labelPosition,
		loading,
		size,
		tabIndex,
		transparent,
		extension,
	} = props;

	const inputProps = {
		as,
		action,
		actionPosition,
		className: `${className || ''} icon`,
		error,
		focus,
		fluid,
		inverted,
		label,
		labelPosition,
		loading,
		size,
		tabIndex,
		transparent,
	};

	const maskedInputProps = {
		as,
		action,
		actionPosition,
		className,
		error,
		focus,
		inverted,
		label,
		labelPosition,
		loading,
		size,
		tabIndex,
		transparent,
	};
	const mask = {
		mask: extension ? '((999) 999-9999[ x9999])|(+9 (999) 999-9999[ x9999])' : '((999) 999-9999)|( +9 (999) 999-9999)',
		greedy: false,
		autoUnmask: true,
	};

	return (
		<Input {...inputProps}>
			<MaskedInput {...maskedInputProps} value={value} mask={mask} />
		</Input>
	);
}
