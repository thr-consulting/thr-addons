import process from 'node:process';

const processEnv = process.env;

type EnvType = string | boolean | number;

export const env = {
	getInt(key: string, def?: number): number {
		if (key in processEnv) {
			const val = processEnv[key] as EnvType;
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
	},
	getFloat(key: string, def?: number): number {
		if (key in processEnv) {
			const val = processEnv[key] as EnvType;
			if (typeof val === 'number') {
				return val;
			}
			if (typeof val === 'boolean') {
				return val ? 1 : 0;
			}
			return parseFloat(val);
		}
		return def || 0;
	},
	getString(key: string, def?: string): string {
		if (key in processEnv) {
			const val = processEnv[key] as EnvType;
			if (typeof val === 'string') {
				return val;
			}
			if (typeof val === 'boolean') {
				return val ? 'true' : 'false';
			}
			return val.toString(10);
		}
		return def || '';
	},
	getBool(key: string, def?: boolean): boolean {
		if (key in processEnv) {
			const val = processEnv[key] as EnvType;
			if (typeof val === 'boolean') {
				return val;
			}
			if (typeof val === 'number') {
				return !(val === 0);
			}
			return val === 'true';
		}
		return def || false;
	},
	getJson(key: string, def?: any): unknown {
		if (key in processEnv) {
			const val = processEnv[key] as EnvType;
			if (typeof val === 'string') {
				try {
					return JSON.parse(val);
				} catch {
					return undefined;
				}
			}
		}
		return def || undefined;
	},
	getRegex(key: string, def?: RegExp): RegExp {
		if (key in processEnv) {
			const val = processEnv[key] as EnvType;
			if (typeof val === 'string' && val.startsWith('/')) {
				try {
					return new RegExp(val);
				} catch {
					return /.*/;
				}
			}
		}
		return def || /.*/;
	},
	getStringArray(key: string, def?: string[]): string[] {
		if (key in processEnv) {
			const val = processEnv[key] as EnvType;
			if (typeof val === 'string') {
				return val.split(',');
			}
		}
		return def || [];
	},
	get(key: string, def?: any): unknown {
		if (key in processEnv) {
			return processEnv[key];
		}
		return def || undefined;
	},
	isProduction(): boolean {
		return processEnv.NODE_ENV === 'production';
	},
	isDevelopment(): boolean {
		return !env.isProduction();
	},
};
