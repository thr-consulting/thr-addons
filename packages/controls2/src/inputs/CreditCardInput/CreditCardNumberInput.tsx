import creditCardType from 'credit-card-type';
import debug from 'debug';
import {validate} from 'luhn';
import {useCallback, useMemo, useState} from 'react';
import {Icon, Input, InputProps, SemanticICONS, SemanticCOLORS} from 'semantic-ui-react';
import type {MaskedInputProps} from '../MaskedInput';
import {useMaskedInput} from '../MaskedInput/useMaskedInput';

const d = debug('thx.controls.inputs.CreditCardInput.CreditCardNumberInput');

interface CreditCardNumberInputProps {
	onChange?: (value: string | undefined) => void;
	value?: string;
}

function getIcon(type: string): SemanticICONS {
	switch (type) {
		case 'visa':
			return 'cc visa';
		case 'mastercard':
			return 'cc mastercard';
		case 'american-express':
			return 'cc amex';
		case 'diners-club':
			return 'cc diners club';
		case 'jcb':
			return 'cc jcb';
		default:
			return 'credit card';
	}
}

export function CreditCardNumberInput(props: CreditCardNumberInputProps & Omit<InputProps, 'onChange'>) {
	const {value, onChange, ...rest} = props;
	const [icon, setIcon] = useState<SemanticICONS>('credit card');
	const [color, setColor] = useState<SemanticCOLORS>('black');

	const checkValidation = useCallback((valueArray: string[]) => {
		const num = valueArray.join('').replaceAll(/(_|\s)/g, '');
		const typ = creditCardType(num);
		const isValid = validate(num);

		if (typ.length === 1) {
			setIcon(getIcon(typ[0].type));
		} else {
			setIcon('credit card');
		}

		if (num.length > 0) {
			if (isValid) {
				setColor('green');
			} else {
				setColor('red');
			}
		} else {
			setColor('black');
		}

		return isValid;
	}, []);

	const creditCardMask: MaskedInputProps['mask'] = useMemo(
		() => ({
			mask: '9999 9999 9999 9999',
			isComplete: checkValidation,
			autoUnmask: true,
		}),
		[checkValidation],
	);

	const cardNumberRef = useMaskedInput({
		mask: creditCardMask,
		value,
		onChange: v => {
			const typ = creditCardType(v || '');
			d(v, typ);
			// checkValidation([v || '']);
			onChange && onChange(v);
		},
	});

	return (
		<Input {...rest} icon>
			<input ref={cardNumberRef} />
			<Icon name={icon} color={color} size="large" />
		</Input>
	);
}
