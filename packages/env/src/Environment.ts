interface Dict<T> {
	[key: string]: T;
}

export type EnvironmentDefaultDict = Dict<string | number | boolean | Record<string, unknown>>;
export type EnvironmentDict = Dict<string | Record<string, unknown> | undefined>;

export class Environment {
	private static instance: Environment;
	readonly #stringDict: Dict<string | undefined>;
	readonly #recordDict: Dict<Record<string, unknown>>;
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

	public static getInstance(): Environment {
		if (!Environment.instance) {
			Environment.instance = new Environment();
		}
		return Environment.instance;
	}

	public static isDevelopment() {
		return this.getInstance().isDevelopment();
	}
	public isDevelopment() {
		return this.#isDevelopment;
	}

	public static isProduction() {
		return this.getInstance().isProduction();
	}
	public isProduction() {
		return this.#isProduction;
	}

	public static addEnvironment(env: EnvironmentDict) {
		Environment.getInstance().addEnvironment(env);
	}
	public addEnvironment(env: EnvironmentDict) {
		Object.keys(env).forEach(key => {
			const envElement = env[key];
			if (!envElement) return;
			if (typeof envElement === 'string') {
				this.#stringDict[key] = envElement;
			} else {
				this.#recordDict[key] = envElement;
			}
		});
	}

	public static addDefaults(defaults: EnvironmentDefaultDict) {
		Environment.getInstance().addDefaults(defaults);
	}
	public addDefaults(defaults: EnvironmentDefaultDict) {
		Object.keys(defaults).forEach(key => {
			this.#defaults[key] = defaults[key];
		});
	}

	public static get(key: string, def?: string | Record<string, unknown>): string | undefined | Record<string, unknown> {
		return Environment.getInstance().get(key, def);
	}
	public get(key: string, def?: string | Record<string, unknown>): string | undefined | Record<string, unknown> {
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
			return sysdef ? 'true' : 'false';
		}
		return def;
	}

	public static getString(key: string, def?: string): string {
		return Environment.getInstance().getString(key, def);
	}
	public getString(key: string, def?: string): string {
		if (key in this.#stringDict) {
			return this.#stringDict[key] || '';
		}
		if (key in this.#defaults) {
			const sysdef = this.#defaults[key];
			if (typeof sysdef === 'string') {
				return sysdef || '';
			}
		}
		return def || '';
	}

	public static getInt(key: string, def?: number): number {
		return Environment.getInstance().getInt(key, def);
	}
	public getInt(key: string, def?: number): number {
		if (key in this.#stringDict) {
			return parseInt(this.#stringDict[key] || '0', 10);
		}
		if (key in this.#defaults) {
			const sysdef = this.#defaults[key];
			if (typeof sysdef === 'number') {
				return sysdef;
			}
		}
		return def || 0;
	}

	public static getFloat(key: string, def?: number): number {
		return Environment.getInstance().getFloat(key, def);
	}
	public getFloat(key: string, def?: number): number {
		if (key in this.#stringDict) {
			return parseFloat(this.#stringDict[key] || '0');
		}
		if (key in this.#defaults) {
			const sysdef = this.#defaults[key];
			if (typeof sysdef === 'number') {
				return sysdef;
			}
		}
		return def || 0;
	}

	public static getBool(key: string, def?: boolean) {
		return Environment.getInstance().getBool(key, def);
	}
	public getBool(key: string, def?: boolean): boolean {
		if (key in this.#stringDict) {
			return this.#stringDict[key] === 'true';
		}
		if (key in this.#defaults) {
			const sysdef = this.#defaults[key];
			if (typeof sysdef === 'boolean') {
				return sysdef;
			}
		}
		return def || false;
	}

	public static getRecord(key: string, def?: Record<string, unknown>) {
		return Environment.getInstance().getRecord(key, def);
	}
	public getRecord(key: string, def?: Record<string, unknown>) {
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
