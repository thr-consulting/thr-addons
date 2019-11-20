import Money from 'js-money';
import accounting from 'accounting';

/**
 * Formats a Money value to a nice string.
 * @param {Money} value - The Money value
 * @param {bool} symbol - If true displays the proper currency symbol
 * @return {string} The formatted Money string
 */
export default function formatMoney(value: Money | undefined | null, symbol = false): string {
	if (!value) return '';
	return accounting.formatMoney(
		value.toDecimal(),
		// @ts-ignore
		symbol ? Money[value.currency].symbol_native : '',
		// @ts-ignore
		Money[value.currency].decimal_digits,
	);
}
