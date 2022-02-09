/**
 * Rounds a decimal value to a certain number of decimal digits.
 * @param {number} value - A number to round.
 * @param {number} decimals - The number of decimal digits to round to.
 * @return {number} - The rounded number.
 */
export function roundTo(value: number, decimals: number): number {
	return Number(`${Math.round(Number(`${value}e${decimals}`)).toString()}e-${decimals}`);
}
