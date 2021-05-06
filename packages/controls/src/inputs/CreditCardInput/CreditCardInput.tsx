import {CreditCardCardNameEnum} from '@thx/yup-types';
import debug from 'debug';
import React, {useEffect, useState} from 'react';
import {MaskedInput, MaskedInputProps} from '../MaskedInput';

const d = debug('thx.controls.inputs.CreditCardInput');

export interface CreditCardInputType {
	cardType?: (cardType: CreditCardCardNameEnum | undefined) => void;
}

export function CreditCardInput({cardType, ...rest}: CreditCardInputType & Omit<MaskedInputProps, 'mask'>) {
	const [type, setType] = useState<CreditCardCardNameEnum | undefined>();

	useEffect(() => {
		if (cardType) cardType(type);
	}, [type]);

	function validate(valueArray: string[]) {
		const cardNumber = valueArray.filter(b => b !== '_' && b !== ' ').join('');

		if (cardNumber[0] === '4') {
			// test using 4111111111111111
			setType(CreditCardCardNameEnum.Visa);
		} else if (
			(parseInt(cardNumber.substr(0, 2), 10) > 50 && parseInt(cardNumber.substr(0, 2), 10) < 56) ||
			(parseInt(cardNumber.substr(0, 2), 10) > 2220 && parseInt(cardNumber.substr(0, 2), 10) < 2721)
		) {
			// test using 5555555555554444 || 2222405343248877
			setType(CreditCardCardNameEnum.MasterCard);
		} else {
			setType(undefined);
		}
		return cardNumber.length === 16;
	}

	const creditCardMask: MaskedInputProps['mask'] = {
		mask: '9999 9999 9999 9999',
		isComplete: validate,
		autoUnmask: true,
	};

	return <MaskedInput mask={creditCardMask} {...rest} />;
}
