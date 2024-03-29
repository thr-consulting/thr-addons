import type {RedisClientType, RedisModules, RedisScripts} from 'redis';
// @ts-ignore
import redisMock from 'redis-mock';
import {promisify} from 'util';
import SharedCache from './index';

function createClient() {
	const mockRedis = redisMock.createClient();
	return {
		get: promisify(mockRedis.get).bind(mockRedis),
		set: async (key: string, value: string, opts?: {EX: number}) => {
			if (opts) {
				return promisify(mockRedis.set).bind(mockRedis)(key, value, 'EX', opts.EX);
			}
			return promisify(mockRedis.set).bind(mockRedis)(key, value);
		},
		exists: promisify(mockRedis.exists).bind(mockRedis),
		del: promisify(mockRedis.del).bind(mockRedis),
		hmGet: promisify(mockRedis.hmget).bind(mockRedis),
		hGet: promisify(mockRedis.hget).bind(mockRedis),
		hSet: promisify(mockRedis.hset).bind(mockRedis),
		hDel: promisify(mockRedis.hdel).bind(mockRedis),
		expire: promisify(mockRedis.expire).bind(mockRedis),
		ttl: promisify(mockRedis.ttl).bind(mockRedis),
	} as unknown as RedisClientType<RedisModules, RedisScripts>;
}

function timeout(seconds: number) {
	return new Promise(resolve => {
		setTimeout(resolve, seconds * 1000);
	});
}

describe('SharedCache', () => {
	it('should construct with defaults', async () => {
		const client = createClient();
		const cache = new SharedCache({redis: client});
		expect(cache).not.toBeNull();
	});

	it('should set and get different types of data', async () => {
		const client = createClient();
		const cache = new SharedCache({redis: client});

		await cache.set('null', null);
		await cache.set('number', 5);
		await cache.set('string', 'thestring');
		await cache.set('object', {i: 6});
		await cache.set('undefined', undefined);
		await cache.set('boolean_true', true);
		await cache.set('boolean_false', false);

		expect(await cache.get('null')).toBe(null);
		expect(await cache.get('number')).toBe(5);
		expect(await cache.get('string')).toBe('thestring');
		expect(await cache.get('object')).toEqual({i: 6});
		expect(await cache.get('undefined')).toBe(null);
		expect(await cache.get('boolean_true')).toBe(true);
		expect(await cache.get('boolean_false')).toBe(false);
	});

	it('should use prefixes', async () => {
		const client = createClient();
		const cache = new SharedCache({redis: client, prefix: 'myprefix'});

		await cache.set('key', 'value');
		expect(await cache.get('key')).toBe('value');
	});

	it('should expire a value by default', async () => {
		const client = createClient();
		const cache = new SharedCache({redis: client, expire: 1});

		await cache.set('key', 'value');
		expect(await cache.get('key')).toBe('value');
		await timeout(1.5);
		expect(await cache.get('key')).not.toBe('value');
	});

	it('should expire a value', async () => {
		const client = createClient();
		const cache = new SharedCache({redis: client});

		await cache.set('key', 'value', 1);
		expect(await cache.get('key')).toBe('value');
		await timeout(1.5);
		expect(await cache.get('key')).not.toBe('value');
	});

	it('should check if a key exists', async () => {
		const client = createClient();
		const cache = new SharedCache({redis: client, expire: 1});

		await cache.set('key', 'value');
		expect(await cache.exists('key')).toBe(true);
	});

	it('should clear a key from the store', async () => {
		const client = createClient();
		const cache = new SharedCache({redis: client, expire: 1});

		await cache.set('key', 'value');
		expect(await cache.exists('key')).toBe(true);
		await cache.clear('key');
		expect(await cache.exists('key')).toBe(false);
	});
});
