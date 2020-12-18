import debug from 'debug';
import {string} from 'yup';
import {checkCreditCard, CreditCardCardNameEnum} from './creditcard';

const d = debug('web.lib.creditCardSchemaType');

function validate(cardNumber?: string) {
	if (!cardNumber) return false;
	if (checkCreditCard(cardNumber, CreditCardCardNameEnum.Visa)) return true;
	if (checkCreditCard(cardNumber, CreditCardCardNameEnum.MasterCard)) return true;
	if (checkCreditCard(cardNumber, CreditCardCardNameEnum.DinersClub)) return true;
	if (checkCreditCard(cardNumber, CreditCardCardNameEnum.CarteBlanche)) return true;
	if (checkCreditCard(cardNumber, CreditCardCardNameEnum.AmEx)) return true;
	if (checkCreditCard(cardNumber, CreditCardCardNameEnum.Discover)) return true;
	if (checkCreditCard(cardNumber, CreditCardCardNameEnum.JCB)) return true;
	if (checkCreditCard(cardNumber, CreditCardCardNameEnum.enRoute)) return true;
	if (checkCreditCard(cardNumber, CreditCardCardNameEnum.Solo)) return true;
	if (checkCreditCard(cardNumber, CreditCardCardNameEnum.Switch)) return true;
	if (checkCreditCard(cardNumber, CreditCardCardNameEnum.Maestro)) return true;
	if (checkCreditCard(cardNumber, CreditCardCardNameEnum.VisaElectron)) return true;
	return checkCreditCard(cardNumber, CreditCardCardNameEnum.LaserCard);
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

export type CreditCardSchemaType = string;
