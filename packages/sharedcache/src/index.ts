import {promisify} from 'util';
import type {RedisClient} from 'redis';

/* eslint-disable no-underscore-dangle */
function getRedisKey(prefix: string, key: string): string {
	return prefix ? `${prefix}:${key}` : key;
}

function toString(value: any): string {
	if (value === undefined) return JSON.stringify(null);
	return JSON.stringify(value);
}

function parse(value: string | null): Record<string, unknown> | null {
	if (!value) return null;
	return JSON.parse(value);
}

interface ISharedCacheConstructor {
	redis: RedisClient;
	prefix?: string;
	expire?: number;
}

interface IPromisifyRedisClient {
	get: (key: string) => Promise<string | null>;
	set: (key: string, val: string, arg3?: any, arg4?: any) => Promise<unknown>;
	exists: (key: string) => Promise<number>;
	del: (key: string) => Promise<number>;
	hmget: (key: string, fields: string[]) => Promise<string[]>;
	hget: (key: string, field: string) => Promise<string>;
	hset: (key: string, field: string, value: string) => Promise<number>;
	hdel: (key: string, fields: string) => Promise<number>;
	expire: (key: string, seconds: number) => Promise<number>;
	ttl: (key: string) => Promise<number>;
	// scan: () => Promise<[string, string[]]>;
}

export default class SharedCache {
	private redis: IPromisifyRedisClient;
	private _expire: number | null;
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
			hmget: promisify(redis.hmget).bind(redis),
			hget: promisify(redis.hget).bind(redis),
			// @ts-ignore
			hset: promisify(redis.hset).bind(redis),
			hdel: promisify(redis.hdel).bind(redis),
			expire: promisify(redis.expire).bind(redis),
			ttl: promisify(redis.ttl).bind(redis),
			// scan: promisify(redis.scan).bind(redis),
		};

		if (expire) {
			this._expire = expire;
		} else {
			this._expire = null;
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
		if (this._expire || expire) {
			await this.redis.set(getRedisKey(this.prefix, key), toString(data), 'EX', expire || this._expire);
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

	/**
	 * Gets multiple keys from a hash key
	 * @param key
	 * @param fields
	 */
	async hmget(key: string, fields: string[]): Promise<any[]> {
		return (await this.redis.hmget(getRedisKey(this.prefix, key), fields)).map(v => parse(v));
	}

	/**
	 * Gets a single hash field value from a hash key
	 * @param key
	 * @param field
	 */
	async hget(key: string, field: string): Promise<any> {
		return parse(await this.redis.hget(getRedisKey(this.prefix, key), field));
	}

	/**
	 * Sets a single hash field value on a hash key
	 * @param key
	 * @param field
	 * @param data
	 */
	async hset(key: string, field: string, data: any) {
		await this.redis.hset(getRedisKey(this.prefix, key), field, toString(data));
	}

	/**
	 * Deletes a single hash field from a hash key
	 * @param key
	 * @param field
	 */
	async hdel(key: string, field: string) {
		await this.redis.hdel(getRedisKey(this.prefix, key), field);
	}

	async expire(key: string, seconds: number) {
		await this.redis.expire(getRedisKey(this.prefix, key), seconds);
	}

	async ttl(key: string) {
		return this.redis.ttl(getRedisKey(this.prefix, key));
	}
}
