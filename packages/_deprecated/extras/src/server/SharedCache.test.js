import redis from 'redis';
import SharedCache from './SharedCache';

const client = redis.createClient(6379, '127.0.0.1');

const cache = new SharedCache({redis: client, prefix: 'SCTest'});
const data = {some: 'data'};

afterAll(async () => {
	await new Promise(resolve => {
		client.quit(() => {
			resolve();
		});
	});
	await new Promise(resolve => setImmediate(resolve));
});

describe('SharedCache', () => {
	it('should get, set, and test', async () => {
		const key = 'mygetsetkey';

		expect(await cache.exists(key)).toBe(false);
		expect(await cache.get(key)).toBeNull();
		const ret = await cache.set(key, data);
		const val = await cache.get(key);
		expect(await cache.exists(key)).toBe(true);
		expect(ret).toEqual(data);
		expect(val).toEqual(data);
		await cache.clear(key);
	});

	it('should delete a key', async () => {
		const key = 'mydelkey';

		expect(await cache.clear(key)).toBe(false);
		await cache.set(key, data);
		expect(await cache.exists(key)).toBe(true);
		expect(await cache.clear(key)).toBe(true);
		expect(await cache.exists(key)).toBe(false);
	});

	it('should expire a key', async () => {
		const key = 'myexkey';
		await cache.set(key, data, 2);
		expect(await cache.exists(key)).toBe(true);
		await new Promise(r => setTimeout(r, 3000));
		expect(await cache.exists(key)).toBe(false);
	});

	it('should work without redis', async () => {
		const prevEnv = process.env.DISABLE_REDIS;
		process.env.DISABLE_REDIS = false;

		const nocache = new SharedCache({prefix: 'NoSCTest'});
		const key = 'mykey';
		expect(await nocache.exists(key)).toBe(false);
		expect(await nocache.get(key)).toBeNull();
		const ret = await nocache.set(key, data);
		const val = await nocache.get(key);
		expect(await nocache.exists(key)).toBe(false);
		expect(ret).toEqual(data);
		expect(val).toBeNull();

		process.env.DISABLE_REDIS = prevEnv;
	});
});
