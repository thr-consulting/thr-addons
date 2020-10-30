import debug from 'debug';
import {string} from 'yup';
import {checkCreditCard, CreditCardCardNameEnum} from './creditcard';

const d = debug('web.lib.creditCardSchemaType');

function validate(cardNumber?: string) {
	if (!cardNumber) return false;
	if (cardNumber.startsWith('4')) {
		return checkCreditCard(cardNumber, CreditCardCardNameEnum.Visa);
	}
	if (
		(parseInt(cardNumber.substr(0, 2), 10) > 50 && parseInt(cardNumber.substr(0, 2), 10) < 56) ||
		(parseInt(cardNumber.substr(0, 2), 10) > 2220 && parseInt(cardNumber.substr(0, 2), 10) < 2721)
	) {
		return checkCreditCard(cardNumber, CreditCardCardNameEnum.MasterCard);
	}
	return false;
}

function test(value: any) {
	if (!value) return true; // this makes sure we only throw the validation error if there is a value
	return validate(value);
}

function message(params: any) {
	return (params.label || 'Card Number').concat(' is invalid');
}

export function creditCardSchemaType() {
	return string().test('Card Number Validation', message, test);
}
