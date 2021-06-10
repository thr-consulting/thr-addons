import {sequential} from './index';

function wait(ms: number) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

const slow = 500;
const fast = 100;

describe('promise-sequential', () => {
	it('should execute promises sequentially', async () => {
		const arr = [];
		const fnArray = [
			async () => {
				await wait(slow);
				arr.push('first');
			},
			async () => {
				await wait(fast);
				arr.push('second');
			},
		];
		await sequential(fnArray);

		expect(arr).toEqual(['first', 'second']);
	});

	it('should produce different output then Promise.all', async () => {
		let arr = [];
		const fnArray = [
			async () => {
				await wait(slow);
				arr.push('first');
			},
			async () => {
				await wait(fast);
				arr.push('second');
			},
		];
		await sequential(fnArray);
		expect(arr).toEqual(['first', 'second']);

		// Reset array
		arr = [];

		// Remember that Promise.all takes an array of promises, sequential takes an array of functions that return promises.
		const proms = [fnArray[0](), fnArray[1]()];
		await Promise.all(proms);
		expect(arr).toEqual(['second', 'first']);
	});

	it('should return an array of returned values', async () => {
		const fnArray = [
			async () => {
				return 'first';
			},
			async () => {
				return true;
			},
			async () => {
				return 3.14;
			},
		];

		const out = await sequential<string | boolean | number>(fnArray);
		expect(out).toEqual(['first', true, 3.14]);
	});

	it('should throw an error (and stop processing) by default', async () => {
		// This obviously also stop processing when an error is thrown.
		const m = [false, false, false];

		const fnArray = [
			async () => {
				m[0] = true;
				return 'first';
			},
			async () => {
				m[1] = true;
				throw new Error('stop processing');
			},
			async () => {
				m[2] = true;
				return 3.14;
			},
		];

		await expect(sequential<string | boolean | number>(fnArray)).rejects.toThrow('stop processing');
		expect(m).toEqual([true, true, false]);
	});

	it('should stop processing if there is a failure (same as default)', async () => {
		// This throws an error, so we are stopped, but we don't get the output because of the thrown error.
		const m = [false, false, false];

		const fnArray = [
			async () => {
				m[0] = true;
				return 'first';
			},
			async () => {
				m[1] = true;
				throw new Error('stop processing');
			},
			async () => {
				m[2] = true;
				return 3.14;
			},
		];

		await expect(sequential<string | boolean | number>(fnArray, {stopOnError: true})).rejects.toThrow('stop processing');
		expect(m).toEqual([true, true, false]);
	});

	it('should not throw an error, continue processing with Error objects returned', async () => {
		const fnArray = [
			async () => {
				return 'first';
			},
			async () => {
				throw new Error('stop processing');
			},
			async () => {
				return 3.14;
			},
		];

		const out = await sequential<string | number>(fnArray, {noThrowOnError: true});
		expect(out).toEqual(['first', new Error('stop processing'), 3.14]);
	});

	it('should not throw an error, and stop processing with Error objects returned', async () => {
		const fnArray = [
			async () => {
				return 'first';
			},
			async () => {
				throw new Error('stop processing');
			},
			async () => {
				return 'second';
			},
		];

		const out = await sequential(fnArray, {stopOnError: true, noThrowOnError: true});
		expect(out).toEqual(['first', new Error('stop processing')]);
	});

	it('should stop the queue on command', async () => {
		const fnArray = [
			async ({index}) => {
				expect(index).toEqual(0);
				return 'first';
			},
			async ({stopQueue}) => {
				stopQueue();
				return 'second';
			},
			async () => {
				return 'third';
			},
		];

		const out = await sequential(fnArray, {stopOnError: true, noThrowOnError: true});
		expect(out).toEqual(['first']);
	});
});
