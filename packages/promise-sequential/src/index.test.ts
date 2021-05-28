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

		const out = await sequential(fnArray);
		expect(out).toEqual(['first', true, 3.14]);
	});
});
