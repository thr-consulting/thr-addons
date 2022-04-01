import {isArray, isObject, isPlainObject, memoize} from 'lodash-es';
import process from 'node:process';

function getEnv() {
	if (typeof window !== 'undefined') {
		// @ts-ignore
		// eslint-disable-next-line no-underscore-dangle
		return window.__ENV__ || {};
	}
	return process.env;
}

type EnvType = string | boolean | number | Record<string, any>;

function getInt(key: string, def = 0): number {
	const envc = getEnv();
	if (key in envc) {
		const val = getEnv()[key] as EnvType;
		if (typeof val === 'number') {
			return val;
		}
		if (typeof val === 'boolean') {
			return val ? 1 : 0;
		}
		if (typeof val === 'string') {
			if (val.includes('.')) {
				throw new Error('Error converting string number to integer. String contains a decimal.');
			}
			return parseInt(val, 10);
		}
		throw new Error(`Environment variable: '${key}' must be an integer`);
	}
	return def;
}

function getFloat(key: string, def = 0): number {
	const envc = getEnv();
	if (key in envc) {
		const val = getEnv()[key] as EnvType;
		if (typeof val === 'number') {
			return val;
		}
		if (typeof val === 'boolean') {
			return val ? 1 : 0;
		}
		if (typeof val === 'string') {
			return parseFloat(val);
		}
		throw new Error(`Environment variable: '${key}' must be a number`);
	}
	return def;
}

function getString(key: string, def = ''): string {
	const envc = getEnv();
	if (key in envc) {
		const val = getEnv()[key] as EnvType;
		if (typeof val === 'string') {
			return val;
		}
		if (typeof val === 'boolean') {
			return val ? 'true' : 'false';
		}
		if (typeof val === 'number') {
			return val.toString(10);
		}
		throw new Error(`Environment variable: '${key}' must be a string`);
	}
	return def;
}

function getBool(key: string, def = false): boolean {
	const envc = getEnv();
	if (key in envc) {
		const val = getEnv()[key] as EnvType;
		if (typeof val === 'boolean') {
			return val;
		}
		if (typeof val === 'number') {
			if (val === 0) return false;
			if (val === 1) return true;
		}
		if (typeof val === 'string') {
			if (val.toLowerCase() === 'true') return true;
			if (val.toLowerCase() === 'false') return false;
		}
		throw new Error(`Environment variable: '${key}' must be a boolean`);
	}
	return def;
}

function getJson(key: string, def = undefined): unknown {
	const envc = getEnv();
	if (key in envc) {
		const val = getEnv()[key] as EnvType;
		if (typeof val === 'string') {
			try {
				return JSON.parse(val);
			} catch {
				throw new Error(`Environment variable: '${key}' must be valid JSON`);
			}
		}
		if (isPlainObject(val)) {
			return val;
		}
		return val;
	}
	return def;
}

function getRecord(key: string, def: Record<string, any> = {}): Record<string, any> {
	const envc = getEnv();
	if (key in envc) {
		const val = getEnv()[key] as EnvType;
		if (typeof val === 'string') {
			try {
				return JSON.parse(val);
			} catch {
				return {};
			}
		}
		if (isObject(val)) {
			return val;
		}
		throw new Error(`Environment variable: '${key}' must be a valid Record<string, any>`);
	}
	return def;
}

function getRegex(key: string, def = /.*/): RegExp {
	const envc = getEnv();
	if (key in envc) {
		const val = getEnv()[key] as EnvType;
		if (typeof val === 'string' && val.startsWith('/')) {
			try {
				return new RegExp(val);
			} catch {
				throw new Error(`Environment variable: '${key}' must be a valid RegExp`);
			}
		}
		throw new Error(`Environment variable: '${key}' must be a valid RegExp`);
	}
	return def;
}

function getStringArray(key: string, def: string[] = []): string[] {
	const envc = getEnv();
	if (key in envc) {
		const val = getEnv()[key] as EnvType;
		if (typeof val === 'string') {
			return val.split(',');
		}
		if (isArray(val)) {
			// TODO this does not check if the array is an array of strings
			return val;
		}
		throw new Error(`Environment variable: '${key}' must be a valid array or comma-separated string`);
	}
	return def;
}

function get(key: string, def: any = undefined): unknown {
	const envc = getEnv();
	if (key in envc) {
		return getEnv()[key];
	}
	return def;
}

function isProduction(): boolean {
	return getEnv().NODE_ENV === 'production';
}

function isDevelopment(): boolean {
	return !isProduction();
}

export const env = {
	getInt: memoize(getInt),
	getFloat: memoize(getFloat),
	getString: memoize(getString),
	getBool: memoize(getBool),
	getJson: memoize(getJson),
	getRecord: memoize(getRecord),
	getRegex: memoize(getRegex),
	getStringArray: memoize(getStringArray),
	get: memoize(get),
	isProduction,
	isDevelopment,
};
