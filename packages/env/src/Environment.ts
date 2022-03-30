interface Dict<T> {
	[key: string]: T;
}

export type EnvironmentDefaultDict = Dict<string | number | boolean | Record<string, unknown>>;
export type EnvironmentDict = Dict<string | Record<string, unknown> | undefined>;

/**
	@deprecated
 */
export class Environment {
	private static instance: Environment;
	readonly #stringDict: Dict<string | undefined>; // Store all environment variables, except records.
	readonly #recordDict: Dict<Record<string, unknown>>; // Store record environment variables.
	readonly #defaults: EnvironmentDefaultDict;
	readonly #isDevelopment: boolean;
	readonly #isProduction: boolean;

	private constructor() {
		this.#stringDict = {};
		this.#recordDict = {};
		this.#defaults = {};
		this.#isProduction = process.env.NODE_ENV === 'production';
		this.#isDevelopment = !this.#isProduction;
	}

	public dump() {
		return {
			strings: this.#stringDict,
			objects: this.#recordDict,
			defaults: this.#defaults,
			isDevelopment: this.#isDevelopment,
			isProduction: this.#isProduction,
		};
	}

	/**
	 * Get the singleton instance of Environment.
	 */
	public static getInstance(): Environment {
		// eslint-disable-next-line no-console
		console.warn(`WARNING! Obsolete feature called. 'Environment' has been deprecated, please use the new 'env' feature instead`);
		if (!Environment.instance) {
			Environment.instance = new Environment();
		}
		return Environment.instance;
	}

	/**
	 * Returns true if NODE_ENV is not production, otherwise false.
	 */
	public static isDevelopment() {
		return this.getInstance().isDevelopment();
	}
	protected isDevelopment() {
		return this.#isDevelopment;
	}

	/**
	 * Returns true if NODE_ENV is production, otherwise false.
	 */
	public static isProduction() {
		return this.getInstance().isProduction();
	}
	protected isProduction() {
		return this.#isProduction;
	}

	/**
	 * Adds a dictionary of environment values. The values can be either a string, or Record.
	 * @param env
	 */
	public static addEnvironment(env: EnvironmentDict) {
		Environment.getInstance().addEnvironment(env);
	}
	protected addEnvironment(env: EnvironmentDict) {
		Object.keys(env || {}).forEach(key => {
			const envElement = env[key];
			if (!envElement) return;
			if (typeof envElement === 'string') {
				this.#stringDict[key] = envElement;
			} else {
				this.#recordDict[key] = envElement;
			}
		});
	}

	/**
	 * Adds a dictionary of environment default values. The values can be either a string, boolean, number, or Record.
	 * @param defaults
	 */
	public static addDefaults(defaults: EnvironmentDefaultDict) {
		Environment.getInstance().addDefaults(defaults);
	}
	protected addDefaults(defaults: EnvironmentDefaultDict) {
		Object.keys(defaults || {}).forEach(key => {
			this.#defaults[key] = defaults[key];
		});
	}

	/**
	 * Returns the raw string (or Record) value. If the `key` is not found, returns the default value, converted to string (except Records).
	 * @param key
	 * @param def
	 */
	public static get(key: string, def?: string | Record<string, unknown>): string | undefined | Record<string, unknown> {
		return Environment.getInstance().get(key, def);
	}
	protected get(key: string, def?: string | Record<string, unknown>): string | undefined | Record<string, unknown> {
		if (key in this.#stringDict) {
			return this.#stringDict[key];
		}
		if (key in this.#recordDict) {
			return this.#recordDict[key];
		}
		if (key in this.#defaults) {
			const sysdef = this.#defaults[key];
			if (typeof sysdef === 'string') {
				return sysdef;
			}
			if (typeof sysdef === 'number') {
				return sysdef.toString(10);
			}
			if (typeof sysdef === 'boolean') {
				return sysdef ? 'true' : 'false';
			}
			return sysdef;
		}
		return def;
	}

	/**
	 * Gets an environment value as a string. If key is not found, the default is returned.
	 * Number and boolean defaults are converted into strings. Record defaults are not returned.
	 * @param key
	 * @param def
	 */
	public static getString(key: string, def?: string): string {
		return Environment.getInstance().getString(key, def);
	}
	protected getString(key: string, def?: string): string {
		if (key in this.#stringDict) {
			return this.#stringDict[key] || '';
		}
		if (key in this.#defaults) {
			const sysdef = this.#defaults[key];
			if (typeof sysdef === 'string') {
				return sysdef || '';
			}
			if (typeof sysdef === 'number') {
				return sysdef.toString(10);
			}
			if (typeof sysdef === 'boolean') {
				return sysdef ? 'true' : 'false';
			}
		}
		return def || '';
	}

	/**
	 * Gets an environment value as an integer number. If key is not found, the default is returned.
	 * String and boolean defaults are attempted to be converted into numbers. Record defaults are not returned.
	 * @param key
	 * @param def
	 */
	public static getInt(key: string, def?: number): number {
		return Environment.getInstance().getInt(key, def);
	}
	protected getInt(key: string, def?: number): number {
		if (key in this.#stringDict) {
			return parseInt(this.#stringDict[key] || '0', 10);
		}
		if (key in this.#defaults) {
			const sysdef = this.#defaults[key];
			if (typeof sysdef === 'number') {
				return sysdef;
			}
			if (typeof sysdef === 'boolean') {
				return sysdef ? 1 : 0;
			}
			if (typeof sysdef === 'string') {
				if (!sysdef.includes('.')) {
					throw new Error('Error converting string number to integer. String contains a decimal.');
				}
				return parseInt(sysdef, 10);
			}
		}
		return def || 0;
	}

	/**
	 * Gets an environment value as a float number. If key is not found, the default is returned.
	 * String and boolean defaults are attempted to be converted into numbers. Record defaults are not returned.
	 * @param key
	 * @param def
	 */
	public static getFloat(key: string, def?: number): number {
		return Environment.getInstance().getFloat(key, def);
	}
	protected getFloat(key: string, def?: number): number {
		if (key in this.#stringDict) {
			return parseFloat(this.#stringDict[key] || '0');
		}
		if (key in this.#defaults) {
			const sysdef = this.#defaults[key];
			if (typeof sysdef === 'number') {
				return sysdef;
			}
			if (typeof sysdef === 'boolean') {
				return sysdef ? 1 : 0;
			}
			if (typeof sysdef === 'string') {
				return parseFloat(sysdef);
			}
		}
		return def || 0;
	}

	/**
	 * Gets an environment value as a boolean. If key is not found, the default is returned.
	 * String and number defaults are attempted to be converted into a boolean. Record defaults are not returned.
	 * @param key
	 * @param def
	 */
	public static getBool(key: string, def?: boolean) {
		return Environment.getInstance().getBool(key, def);
	}
	protected getBool(key: string, def?: boolean): boolean {
		if (key in this.#stringDict) {
			return this.#stringDict[key] === 'true';
		}
		if (key in this.#defaults) {
			const sysdef = this.#defaults[key];
			if (typeof sysdef === 'boolean') {
				return sysdef;
			}
			if (typeof sysdef === 'string') {
				return sysdef === 'true';
			}
			if (typeof sysdef === 'number') {
				return !(sysdef === 0);
			}
		}
		return def || false;
	}

	/**
	 * Gets an environment value as a Record. If key is not found, the default is returned.
	 * Only record defaults are returned.
	 * @param key
	 * @param def
	 */
	public static getRecord(key: string, def?: Record<string, unknown>) {
		return Environment.getInstance().getRecord(key, def);
	}
	protected getRecord(key: string, def?: Record<string, unknown>) {
		if (key in this.#recordDict) {
			return this.#recordDict;
		}
		if (key in this.#defaults) {
			const sysdef = this.#defaults[key];
			if (typeof sysdef !== 'string' && typeof sysdef !== 'boolean' && typeof sysdef !== 'number') {
				return sysdef;
			}
		}
		return def || {};
	}
}
