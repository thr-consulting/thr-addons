import accounting from 'accounting';
import Money from 'js-money';

/**
 * Formats a Money value to a nice string.
 * @param {Money} value - The Money value
 * @param {boolean} symbol - If true displays the proper currency symbol
 * @return {string} The formatted Money string
 */
export function formatMoney(value: Money | undefined | null = null, symbol = false): string {
	if (!value) return '';
	return accounting.formatMoney(
		value.toDecimal(),
		// @ts-ignore
		symbol ? Money[value.currency].symbol_native : '',
		// @ts-ignore
		Money[value.currency].decimal_digits,
	);
}
