/*
	When passed a promise of a type, return just the type.
 */
export type TypeOfPromise<T> = T extends Promise<infer U> ? U : never;

/*
	Like the Partial<> type but travels down the tree.
 */
// eslint-disable-next-line ,@typescript-eslint/no-unsafe-function-type,@typescript-eslint/no-unsafe-function-type
export type DeepPartial<T> = T extends Function ? T : T extends Record<string, unknown> ? {[P in keyof T]?: DeepPartial<T[P]>} : T;

/*
	Use this to filter false values out of an array:

	const arr = [
		1,
		2,
		3,
		mybool && 4,
	].filter((Boolean as any) as ExcludeFalse);
 */
export type ExcludeFalse = <T>(x: T | false) => x is T;

export type Maybe<T> = T | null;

/*
	The field must batch exactly the type of T
 */
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};

/*
	Make certain fields optional
 */
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>};

/*
	Makes the type not null or undefined
 */
export type NotOptional<T> = T extends null | undefined ? never : T;

/*
	Pulls the type of an individual item in an array
 */
export type UnArray<T> = T extends Array<infer U> ? U : T;
