// Used from https://www.braemoor.co.uk/software/creditcard.shtml
/*
This routine checks the credit card number. The following checks are made:

1. A number has been provided
2. The number is a right length for the card
3. The number has an appropriate prefix for the card
4. The number has a valid modulus 10 number check digit if required

If the validation fails an error is reported.

The structure of credit card formats was gleaned from a variety of sources on the web, although the
best is probably on Wikipedia ("Credit card number"):

  http://en.wikipedia.org/wiki/Credit_card_number

Parameters:
            cardNumber           number on the card
            cardName             name of card as defined in the card list below

Author:     John Gardner
Date:       1st November 2003
Updated:    26th Feb. 2005      Additional cards added by request
Updated:    27th Nov. 2006      Additional cards added from Wikipedia
Updated:    18th Jan. 2008      Additional cards added from Wikipedia
Updated:    26th Nov. 2008      Maestro cards extended
Updated:    19th Jun. 2009      Laser cards extended from Wikipedia
Updated:    11th Sep. 2010      Typos removed from Diners and Solo definitions (thanks to Noe Leon)
Updated:    10th April 2012     New matches for Maestro, Diners Enroute and Switch
Updated:    17th October 2012   Diners Club prefix 38 not encoded

   If a credit card number is invalid, an error reason is loaded into the global ccErrorNo variable.
   This can be be used to index into the global error  string array to report the reason to the user
   if required:

   e.g. if (!checkCreditCard (number, name) alert (ccErrors(ccErrorNo);
*/

const ccErrors: string[] = [];

ccErrors[0] = 'Unknown card type';
ccErrors[1] = 'No card number provided';
ccErrors[2] = 'Credit card number is in invalid format';
ccErrors[3] = 'Credit card number is invalid';
ccErrors[4] = 'Credit card number has an inappropriate number of digits';
ccErrors[5] = 'Warning! This credit card number is associated with a scam attempt';

export enum CreditCardCardNameEnum {
	Visa = 'Visa',
	MasterCard = 'Master Card',
	DinersClub = 'Diners Club',
	CarteBlanche = 'Carte Blanche',
	AmEx = 'Am Ex',
	Discover = 'Discover',
	JCB = 'JCB',
	enRoute = 'enRoute',
	Solo = 'Solo',
	Switch = 'Switch',
	Maestro = 'Maestro',
	VisaElectron = 'Visa Electron',
	LaserCard = 'Laser Card',
}
interface Card {
	name: CreditCardCardNameEnum; // type of card
	length: string; // List of possible valid lengths of the card number for the card
	prefixes: string; // List of possible prefixes for the card
	checkDigit: boolean; // Boolean to say whether there is a check digit
}

export function checkCreditCard(cardNumber: string, cardName: CreditCardCardNameEnum, getError?: (error: string) => void) {
	// Array to hold the permitted card characteristics
	const cards: Card[] = [];
	const setError = (errNum: number) => {
		if (getError) getError(ccErrors[errNum]);
	};

	// Define the cards we support. You may add additional card types as follows.
	cards[0] = {name: CreditCardCardNameEnum.Visa, length: '13,16', prefixes: '4', checkDigit: true};
	cards[1] = {name: CreditCardCardNameEnum.MasterCard, length: '16', prefixes: '51,52,53,54,55', checkDigit: true};
	cards[2] = {name: CreditCardCardNameEnum.DinersClub, length: '14,16', prefixes: '36,38,54,55', checkDigit: true};
	cards[3] = {name: CreditCardCardNameEnum.CarteBlanche, length: '14', prefixes: '300,301,302,303,304,305', checkDigit: true};
	cards[4] = {name: CreditCardCardNameEnum.AmEx, length: '15', prefixes: '34,37', checkDigit: true};
	cards[5] = {name: CreditCardCardNameEnum.Discover, length: '16', prefixes: '6011,622,64,65', checkDigit: true};
	cards[6] = {name: CreditCardCardNameEnum.JCB, length: '16', prefixes: '35', checkDigit: true};
	cards[7] = {name: CreditCardCardNameEnum.enRoute, length: '15', prefixes: '2014,2149', checkDigit: true};
	cards[8] = {name: CreditCardCardNameEnum.Solo, length: '16,18,19', prefixes: '6334,6767', checkDigit: true};
	cards[9] = {name: CreditCardCardNameEnum.Switch, length: '16,18,19', prefixes: '4903,4905,4911,4936,564182,633110,6333,6759', checkDigit: true};
	cards[10] = {
		name: CreditCardCardNameEnum.Maestro,
		length: '12,13,14,15,16,18,19',
		prefixes: '5018,5020,5038,6304,6759,6761,6762,6763',
		checkDigit: true,
	};
	cards[11] = {name: CreditCardCardNameEnum.VisaElectron, length: '16', prefixes: '4026,417500,4508,4844,4913,4917', checkDigit: true};
	cards[12] = {name: CreditCardCardNameEnum.LaserCard, length: '16,17,18,19', prefixes: '6304,6706,6771,6709', checkDigit: true};

	// Establish card type
	let cardType = -1;
	for (let i = 0; i < cards.length; i++) {
		// See if it is this card (ignoring the case of the string)
		if (cardName.toLowerCase() === cards[i].name.toLowerCase()) {
			cardType = i;
			break;
		}
	}

	// If card type not found, report an error
	if (cardType === -1) {
		setError(0);
		return false;
	}

	// Ensure that the user has provided a credit card number
	if (cardNumber.length === 0) {
		setError(1);
		return false;
	}

	// Check that the number is numeric
	const cardNo = cardNumber.replace(/\s/g, '');
	const cardExp = /^[0-9]{13,19}$/;
	if (!cardExp.exec(cardNo)) {
		setError(2);
		return false;
	}

	// Now check the modulus 10 check digit - if required
	if (cards[cardType].checkDigit) {
		let checksum = 0; // running checksum total
		let j = 1; // takes value of 1 or 2

		// Process each digit one by one starting at the right
		let calc;
		for (let i = cardNo.length - 1; i >= 0; i--) {
			// Extract the next digit and multiply by 1 or 2 on alternative digits.
			calc = Number(cardNo.charAt(i)) * j;

			// If the result is in two digits add 1 to the checksum total
			if (calc > 9) {
				checksum += 1;
				calc -= 10;
			}

			// Add the units element to the checksum total
			checksum += calc;

			// Switch the value of j
			if (j === 1) {
				j = 2;
			} else {
				j = 1;
			}
		}

		// All done - if checksum is divisible by 10, it is a valid modulus 10.
		// If not, report an error.
		if (checksum % 10 !== 0) {
			setError(3);
			return false;
		}
	}

	// Check it's not a spam number
	if (cardNo === '5490997771092064') {
		setError(5);
		return false;
	}

	// The following are the card-specific checks we undertake.
	let LengthValid = false;
	let PrefixValid = false;

	// Load an array with the valid prefixes for this card
	const prefix = cards[cardType].prefixes.split(',');

	// Now see if any of them match what we have in the card number
	for (let i = 0; i < prefix.length; i++) {
		const exp = new RegExp(`^${prefix[i]}`);
		if (exp.test(cardNo)) PrefixValid = true;
	}

	// If it isn't a valid prefix there's no point at looking at the length
	if (!PrefixValid) {
		setError(3);
		return false;
	}

	// See if the length is valid for this card
	const lengths = cards[cardType].length.split(',');
	for (let j = 0; j < lengths.length; j++) {
		if (cardNo.length === parseInt(lengths[j], 10)) LengthValid = true;
	}

	// See if all is OK by seeing if the length was valid. We only check the length if all else was
	// hunky dory.
	if (!LengthValid) {
		setError(4);
		return false;
	}

	// The credit card is in the required format.
	return true;
}
