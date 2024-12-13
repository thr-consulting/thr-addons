import type {Redis} from 'ioredis';

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
	redis: Redis;
	prefix?: string;
	expire?: number;
}

export default class SharedCache {
	private redis: Redis;
	private readonly _expire: number | null;
	private readonly prefix: string;

	/**
	 * Constructs a new SharedCache
	 * @param redis
	 * @param prefix
	 * @param expire
	 */
	constructor({redis, prefix, expire}: ISharedCacheConstructor) {
		this.redis = redis;

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
		if (expire) {
			await this.redis.set(getRedisKey(this.prefix, key), toString(data), 'EX', expire);
		} else if (this._expire) {
			await this.redis.set(getRedisKey(this.prefix, key), toString(data), 'EX', this._expire);
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
	 * @return {Promise<boolean>} True if the key exists and is cleared, otherwise false
	 */
	async clear(key: string): Promise<boolean> {
		return !!(await this.redis.del(getRedisKey(this.prefix, key)));
	}

	async clearPrefix(prefix: string): Promise<boolean> {
		const mainPrefix = this.prefix.length > 0 ? `${this.prefix}:` : '';
		const pattern = `${mainPrefix}${prefix}:*`;

		// Recursive function to scan and delete keys
		const scanAndDelete = async (cursor = '0'): Promise<void> => {
			const result = await this.redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
			const nextCursor = result[0];
			const keys = result[1];

			if (keys.length > 0) {
				await this.redis.del(...keys);
			}

			if (nextCursor !== '0') {
				await scanAndDelete(nextCursor);
			}
		};

		try {
			await scanAndDelete();
			return true;
		} catch (error) {
			return false;
		}
	}

	/**
	 * Gets multiple keys from a hash key
	 * @param key
	 * @param fields
	 */
	async hmget(key: string, fields: string[]): Promise<any[]> {
		return (await this.redis.hmget(getRedisKey(this.prefix, key), ...fields)).map(v => parse(v));
	}

	/**
	 * Gets a single hash field value from a hash key
	 * @param key
	 * @param field
	 */
	async hget(key: string, field: string): Promise<any> {
		const val = await this.redis.hget(getRedisKey(this.prefix, key), field);
		return parse(val || null);
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

	async quit() {
		await this.redis.quit();
	}
}
