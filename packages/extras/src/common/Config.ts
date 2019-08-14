export default class Config {
	_config: any;

	static parseNumber(value: string | undefined, def: number) {
		if (value) return parseInt(value, 10);
		return def;
	}

	constructor(defaults) {
		this._config = defaults;
	}

	set(name, value) {
		this._config[name] = value;
	}

	get(name) {
		return this._config[name];
	}
}
