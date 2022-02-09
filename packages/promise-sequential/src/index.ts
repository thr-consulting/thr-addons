/*
 * Taken from promise-sequential package: https://github.com/russiann/promise-sequential
 *
 * Heavily modified to remove useless code and added typescript
 */
export interface PromiseFunctionOpts<T> {
	stopQueue: (result?: T | Error) => T | Error | undefined;
	index: number;
}
export type PromiseFunction<T> = (opts: PromiseFunctionOpts<T>) => Promise<T>;

export interface PromiseSequentialOptions {
	stopOnError?: boolean; // Stops processing when an error is thrown. Default is to continue as long as noThrowOnError is also true.
	noThrowOnError?: boolean; // Does not throw an Error on failure. Default behaviour throws an Error immediately.
}

/**
 * Executes an array of Promise-returning functions sequentially, returning an array of any data resolved from the promises.
 * @param promiseFunctions An array of promise-returning functions
 * @param opts
 * @return An array of values returned from the promises
 */
export function sequential<T = any>(promiseFunctions: PromiseFunction<T>[], opts?: PromiseSequentialOptions): Promise<(T | Error)[]> {
	const results: (T | Error)[] = [];
	let isError = false;
	let isStopQueue = false;

	const stopQueue = (result?: T | Error) => {
		if (result) results.push(result);
		isStopQueue = true;
		return result;
	};

	const iteratorFn = (prevPromise: Promise<T | Error>, curPromise: PromiseFunction<T>, index: number) => {
		return prevPromise
			.then(result => {
				if (isStopQueue) return prevPromise;
				if (index !== 0 && !(result instanceof Error && result === results[index - 2])) {
					results.push(result);
				}
				if (opts?.stopOnError && isError) return prevPromise;
				return curPromise({stopQueue, index});
			})
			.catch((reason: Error) => {
				if (opts?.stopOnError) {
					isError = true;
				}
				// If we are not throwing the error, resolve undefined
				return opts?.noThrowOnError ? Promise.resolve(reason) : Promise.reject(reason);
			});
	};

	return (
		promiseFunctions
			// The next line allows us to call the final .then() which lets us return the results
			.concat(() => Promise.resolve() as unknown as Promise<T>)
			.reduce(iteratorFn, Promise.resolve() as unknown as Promise<T>)
			.then(() => {
				return results;
			})
	);
}
