/*
 * Taken from promise-sequential package: https://github.com/russiann/promise-sequential
 *
 * Heavily modified to remove useless code and added typescript
 */
export type PromiseFunction = () => Promise<any>;

/**
 * Executes an array of Promise-returning functions sequentially, returning an array of any data resolved from the promises.
 * @param promiseFunctions An array of promise-returning functions
 * @return An array of values returned from the promises
 */
export function sequential(promiseFunctions: PromiseFunction[]): Promise<any[]> {
	const results: any[] = [];
	const iteratorFn = (prevPromise: Promise<boolean>, curPromise: PromiseFunction, index: number) => {
		return prevPromise.then(result => {
			// Don't push the first result, which is the starting Promise.resolve(false) in the reduce below
			if (index !== 0) results.push(result);
			return curPromise();
		});
	};

	return (
		promiseFunctions
			// The next line allows us to call the final .then() which lets us return the results
			.concat(() => Promise.resolve())
			.reduce(iteratorFn, Promise.resolve(false))
			.then(() => {
				return results;
			})
	);
}
