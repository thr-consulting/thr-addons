export {isString} from './typeguards';
export type {ExcludeFalse, DeepPartial, TypeOfPromise} from './types';
export {numberToHexString, hexStringToNumber, numberToBinaryString, hexToBinaryString, numberToTwosComplement, isBitSet} from './bits';

/**
 * Take each field's value in an object and map it to functions that return the values.
 * @param obj
 */
export function valuesToFunctions<T extends Record<string, unknown>>(obj: T): {[P in keyof T]: () => T[P]} {
	return (Object.keys(obj) as (keyof T)[]).reduce(
		(memo, v) => ({
			...memo,
			[v]: () => obj[v],
		}),
		{} as {[P in keyof T]: () => T[P]},
	);
}
