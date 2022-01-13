export function isBitSet(num: number, bitPos = 0): boolean {
	// eslint-disable-next-line no-bitwise
	return ((num >> (bitPos - 1)) & 1) > 0;
}

export function numberToHexString(n: number): string {
	if (n < 0) {
		return (0xffffffff + n + 1).toString(16);
	}
	return n.toString(16);
}

export function hexStringToNumber(hex: string): number {
	return parseInt(hex, 16);
}

export function hexToBinaryString(hex: string) {
	return parseInt(hex, 16).toString(2).padStart(32, '0');
}

export function numberToBinaryString(num: number) {
	return num.toString(2).padStart(32, '0');
}

export function numberToTwosComplement(num: number): number {
	if (isBitSet(num)) {
		// eslint-disable-next-line no-bitwise
		return ~~num;
	}
	return num;
}
