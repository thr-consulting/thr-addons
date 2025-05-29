import debug from 'debug';
import {useCallback, useMemo, useState} from 'react';
import {Icon, Input, type SemanticCOLORS} from 'semantic-ui-react';
import SIN from 'social-insurance-number';
import type {MaskedInputProps} from '../MaskedInput';
import {useMaskedInput} from '../MaskedInput/useMaskedInput';

const d = debug('thx.controls.inputs.SinInput');

export interface SinInputProps extends Omit<MaskedInputProps, 'mask'> {
	value?: string;
	onChange(value?: string): void;
}

export function SinInput(props: SinInputProps) {
	const {value, onChange, ...rest} = props;
	const [color, setColor] = useState<SemanticCOLORS>('black');

	const checkValidation = useCallback((valueArray: string[]) => {
		const num = valueArray.join('').replaceAll(/(_|\s|-)/g, '');
		const validate = new SIN(num);
		if (num.length > 0) {
			if (validate.isValid()) {
				setColor('green');
			} else {
				setColor('red');
			}
		} else {
			setColor('black');
		}
		return validate.isValid();
	}, []);

	const mask: MaskedInputProps['mask'] = useMemo(
		() => ({
			mask: '999-999-999',
			isComplete: checkValidation,
			greedy: false,
			autoUnmask: true,
		}),
		[checkValidation],
	);

	const cardNumberRef = useMaskedInput({
		mask,
		value,
		onChange: v => {
			onChange && onChange(v);
		},
		onSet: v => {
			checkValidation([v || '']);
		},
	});

	return (
		<Input {...rest} icon>
			<input ref={cardNumberRef} />
			<Icon name="id badge" color={color} size="large" />
		</Input>
	);
}
