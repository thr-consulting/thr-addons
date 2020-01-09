import {promisify} from 'util';

/* eslint-disable no-underscore-dangle */
function getRedisKey(prefix: string, key: string): string {
	return prefix ? `${prefix}:${key}` : key;
}

function toString(value: any): string {
	if (value === null) return '';
	if (typeof value === 'object') return JSON.stringify(value);
	return value;
}

function parse(value: string): {} | null {
	if (value === '' || value === null) return null;
	return JSON.parse(value);
}

export default class SharedCache {
	/**
	 * Constructs a new SharedCache
	 * @param redis
	 * @param prefix
	 * @param expire
	 */
	constructor({redis, prefix, expire}: {redis?: any, prefix?: string, expire?: number}) {
		if (redis) {
			this._redis = {
				get: promisify(redis.get).bind(redis),
				set: promisify(redis.set).bind(redis),
				exists: promisify(redis.exists).bind(redis),
				del: promisify(redis.del).bind(redis),
				scan: promisify(redis.scan).bind(redis),
			};
		}

		if (expire) {
			this._expire = expire;
		} else {
			this._expire = null;
		}
		this._prefix = prefix || '';
	}

	_redis: any | null;
	_expire: number | null;
	_prefix: string;

	/**
	 * Sets a key value pair with optional expiry (in seconds).
	 * @param key
	 * @param data
	 * @param expire
	 * @return {Promise<*>}
	 */
	async set(key: string, data: any, expire?: number) {
		if (!this._redis) return data;

		if (this._expire || expire) {
			await this._redis.set(getRedisKey(this._prefix, key), toString(data), 'EX', expire || this._expire);
		} else {
			await this._redis.set(getRedisKey(this._prefix, key), toString(data));
		}

		return data;
	}

	/**
	 * Gets the value of a key. Returns null if the key does not exist.
	 * @param key
	 * @return {Promise<*>} The value or null.
	 */
	async get(key) {
		if (!this._redis) return null;

		return parse(await this._redis.get(getRedisKey(this._prefix, key)));
	}

	/**
	 * Checks if the key exists in the store.
	 * @param key
	 * @return {Promise<boolean>} Returns true if the key is found, otherwise false.
	 */
	async exists(key) {
		if (!this._redis) return false;

		return !!await this._redis.exists(getRedisKey(this._prefix, key));
	}

	/**
	 * Removes a key from the store
	 * @param key
	 * @return {Promise<boolean>} True if they key exists and is cleared, otherwise false
	 */
	async clear(key) {
		if (!this._redis) return false;
		return !!await this._redis.del(getRedisKey(this._prefix, key));
	}
}
