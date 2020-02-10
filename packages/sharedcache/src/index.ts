import {promisify} from 'util';
import {RedisClient} from 'redis';

/* eslint-disable no-underscore-dangle */
function getRedisKey(prefix: string, key: string): string {
	return prefix ? `${prefix}:${key}` : key;
}

function toString(value: any): string {
	if (value === undefined) return JSON.stringify(null);
	return JSON.stringify(value);
}

function parse(value: string): {} | null {
	return JSON.parse(value);
}

interface ISharedCacheConstructor {
	redis: RedisClient;
	prefix?: string;
	expire?: number;
}

interface IPromisifyRedisClient {
	get: (name: string) => Promise<string>;
	set: (name: string, val: string, arg3?: any, arg4?: any) => Promise<unknown>;
	exists: (key: string) => Promise<number>;
	del: (key: string) => Promise<number>;
	// scan: () => Promise<[string, string[]]>;
}

export default class SharedCache {
	private redis: IPromisifyRedisClient;
	private expire: number | null;
	private prefix: string;

	/**
	 * Constructs a new SharedCache
	 * @param redis
	 * @param prefix
	 * @param expire
	 */
	constructor({redis, prefix, expire}: ISharedCacheConstructor) {
		this.redis = {
			get: promisify(redis.get).bind(redis),
			set: promisify(redis.set).bind(redis),
			exists: promisify(redis.exists).bind(redis),
			del: promisify(redis.del).bind(redis),
			// scan: promisify(redis.scan).bind(redis),
		};

		if (expire) {
			this.expire = expire;
		} else {
			this.expire = null;
		}

		this.prefix = prefix || '';
	}

	/**
	 * Sets a key value pair with optional expiry (in seconds).
	 * @param key
	 * @param data
	 * @param expire
	 * @return {Promise<*>}
	 */
	async set(key: string, data: any, expire?: number) {
		if (this.expire || expire) {
			await this.redis.set(getRedisKey(this.prefix, key), toString(data), 'EX', expire || this.expire);
		} else {
			await this.redis.set(getRedisKey(this.prefix, key), toString(data));
		}

		return data;
	}

	/**
	 * Gets the value of a key. Returns null if the key does not exist.
	 * @param key
	 * @return {Promise<*>} The value or null.
	 */
	async get(key: string): Promise<any> {
		return parse(await this.redis.get(getRedisKey(this.prefix, key)));
	}

	/**
	 * Checks if the key exists in the store.
	 * @param key
	 * @return {Promise<boolean>} Returns true if the key is found, otherwise false.
	 */
	async exists(key: string): Promise<boolean> {
		return !!(await this.redis.exists(getRedisKey(this.prefix, key)));
	}

	/**
	 * Removes a key from the store
	 * @param key
	 * @return {Promise<boolean>} True if they key exists and is cleared, otherwise false
	 */
	async clear(key: string): Promise<boolean> {
		return !!(await this.redis.del(getRedisKey(this.prefix, key)));
	}
}
