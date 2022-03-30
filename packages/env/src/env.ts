import {memoize} from 'lodash-es';
import process from 'node:process';

function getEnv() {
	if (typeof window !== 'undefined') {
		// @ts-ignore
		return window.__ENV__ || {};
	}
	return process.env;
}

type EnvType = string | boolean | number;

function getInt(key: string, def?: number): number {
	const envc = getEnv();
	if (key in envc) {
		const val = getEnv()[key] as EnvType;
		if (typeof val === 'number') {
			return val;
		}
		if (typeof val === 'boolean') {
			return val ? 1 : 0;
		}
		if (val.includes('.')) {
			throw new Error('Error converting string number to integer. String contains a decimal.');
		}
		return parseInt(val, 10);
	}
	return def || 0;
}

function getFloat(key: string, def?: number): number {
	const envc = getEnv();
	if (key in envc) {
		const val = getEnv()[key] as EnvType;
		if (typeof val === 'number') {
			return val;
		}
		if (typeof val === 'boolean') {
			return val ? 1 : 0;
		}
		return parseFloat(val);
	}
	return def || 0;
}

function getString(key: string, def?: string): string {
	const envc = getEnv();
	if (key in envc) {
		const val = getEnv()[key] as EnvType;
		if (typeof val === 'string') {
			return val;
		}
		if (typeof val === 'boolean') {
			return val ? 'true' : 'false';
		}
		return val.toString(10);
	}
	return def || '';
}

function getBool(key: string, def?: boolean): boolean {
	const envc = getEnv();
	if (key in envc) {
		const val = getEnv()[key] as EnvType;
		if (typeof val === 'boolean') {
			return val;
		}
		if (typeof val === 'number') {
			return !(val === 0);
		}
		return val === 'true';
	}
	return def || false;
}

function getJson(key: string, def?: any): unknown {
	const envc = getEnv();
	if (key in envc) {
		const val = getEnv()[key] as EnvType;
		if (typeof val === 'string') {
			try {
				return JSON.parse(val);
			} catch {
				return undefined;
			}
		}
	}
	return def || undefined;
}

function getRegex(key: string, def?: RegExp): RegExp {
	const envc = getEnv();
	if (key in envc) {
		const val = getEnv()[key] as EnvType;
		if (typeof val === 'string' && val.startsWith('/')) {
			try {
				return new RegExp(val);
			} catch {
				return /.*/;
			}
		}
	}
	return def || /.*/;
}

function getStringArray(key: string, def?: string[]): string[] {
	const envc = getEnv();
	if (key in envc) {
		const val = getEnv()[key] as EnvType;
		if (typeof val === 'string') {
			return val.split(',');
		}
	}
	return def || [];
}

function get(key: string, def?: any): unknown {
	const envc = getEnv();
	if (key in envc) {
		return getEnv()[key];
	}
	return def || undefined;
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
	getRegex: memoize(getRegex),
	getStringArray: memoize(getStringArray),
	get: memoize(get),
	isProduction,
	isDevelopment,
};
