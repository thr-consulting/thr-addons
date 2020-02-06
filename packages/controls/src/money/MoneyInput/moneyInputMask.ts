import 'inputmask/dist/inputmask/inputmask.numeric.extensions';
import Inputmask from 'inputmask';
import Money from 'js-money';

export interface MoneyInputMaskArgs {
	element: HTMLInputElement;
	currency: string;
	onChange: (value: string) => void;
}

export function moneyInputMask({element, currency, onChange}: MoneyInputMaskArgs) {
	function onComplete() {
		onChange(element.current?.value);
	}

	function onCleared() {
		onChange('0');
	}

	const im = new Inputmask({
		alias: 'numeric',
		groupSeparator: ',',
		autoGroup: true,
		digits: Money[currency].decimal_digits,
		digitsOptional: false,
		// prefix: `${Money[currency].symbol} `,
		placeholder: '0',
		autoUnmask: true,
		oncomplete: onComplete,
		oncleared: onCleared,
	});
	im.mask(element);

	return im;
}
