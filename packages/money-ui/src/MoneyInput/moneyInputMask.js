import 'inputmask/dist/inputmask/inputmask.numeric.extensions';
import Inputmask from 'inputmask';
import Money from 'js-money';

export default function moneyInputMask({element, currency, onChange, onKeydown}) {
	function onComplete(ev) {
		onChange(ev.target.value);
	}

	function onCleared() {
		onChange(0);
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
		onKeyDown: onKeydown,
	});
	im.mask(element);

	return im;
}
