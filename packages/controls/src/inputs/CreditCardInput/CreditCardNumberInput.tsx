import creditCardType from 'credit-card-type';
import debug from 'debug';
import {validate} from 'luhn';
import {useCallback, useMemo, useState} from 'react';
import {CreditCard} from 'tabler-icons-react';
import type {TextInputProps} from '@mantine/core';
import {TextInput, useMantineTheme} from '@mantine/core';
import type {MaskedInputProps} from '../MaskedInput';
import {useMaskedInput} from '../MaskedInput';

const d = debug('thx.controls.inputs.CreditCardInput.CreditCardNumberInput');

interface CreditCardNumberInputProps {
	onChange?: (value: string | undefined) => void;
	value?: string;
}

export function CreditCardNumberInput(props: CreditCardNumberInputProps & Omit<TextInputProps, 'onChange'>) {
	const {value, onChange, ...rest} = props;
	const theme = useMantineTheme();
	const defaultColor = theme.colorScheme === 'light' ? 'black' : 'white';
	const [color, setColor] = useState(defaultColor);

	const checkValidation = useCallback(
		(valueArray: string[]) => {
			const num = valueArray.join('').replaceAll(/(_|\s)/g, '');
			// const typ = creditCardType(num);
			const isValid = validate(num);

			if (num.length > 0) {
				if (isValid) {
					setColor('green');
				} else {
					setColor('red');
				}
			} else {
				setColor(defaultColor);
			}

			return isValid;
		},
		[defaultColor],
	);

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

	return <TextInput {...rest} icon={<CreditCard color={color} />} ref={cardNumberRef} />;
}
