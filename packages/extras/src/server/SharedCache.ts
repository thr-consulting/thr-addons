/* eslint-disable no-underscore-dangle */
import Redis from 'ioredis';

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
	 * @param prefix
	 * @param expire
	 */
	constructor({prefix, expire}: {prefix?: string, expire?: number}) {
		if (process.env.DISABLE_REDIS === 'true') {
			this._redis = null;
		} else {
			this._redis = new Redis({
				port: parseInt(process.env.REDIS_PORT || '6379', 10),
				host: process.env.REDIS_HOST || '127.0.0.1',
			});
		}
		if (process.env.REDIS_EXPIRE) {
			this._expire = parseInt(process.env.REDIS_EXPIRE || '0', 10);
		} else if (expire) {
			this._expire = expire;
		} else {
			this._expire = null;
		}
		this._prefix = prefix || '';
	}

	_redis: Redis.Redis | null;
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

		const multi = this._redis.multi();
		multi.set(getRedisKey(this._prefix, key), toString(data));
		if (this._expire || expire) multi.expire(getRedisKey(this._prefix, key), expire || this._expire);

		return new Promise((resolve, reject) => {
			multi.exec(error => {
				if (error) reject(error);
				else resolve(data);
			});
		});
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

	/**
	 * Clears all keys from the current prefix.
	 * @return {Promise<any>}
	 */
	clearAll() {
		return new Promise((resolve, reject) => {
			if (!this._redis) {
				resolve();
			} else {
				const stream = this._redis.scanStream({match: `${this._prefix}:*`});
				stream.on('data', keys => {
					if (keys.length) {
						const pipeline = this._redis.pipeline();
						keys.forEach(key => {
							pipeline.del(key);
						});
						pipeline.exec();
					}
				});
				stream.on('error', reject);
				stream.on('end', resolve);
			}
		});
	}
}
