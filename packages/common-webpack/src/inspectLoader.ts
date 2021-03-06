/* eslint-disable no-console, no-underscore-dangle,@typescript-eslint/no-var-requires */
/*
 * With the DEBUG environment variable "inspectLoader" set this file will log all Babel and other Webpack loaders.
 */
import debug from 'debug';

const d = debug('thx.common-webpack.inspectLoader');

export function log(name: string, resource: string): void {
	d(`[${name}] ${resource}`);
}

export interface Inspection {
	options: {
		loaderName: string;
	};
	context: {
		_module: {
			resource: string;
		};
	};
}

export function inspectLoader(loaderName: string) {
	return {
		loader: 'inspect-loader',
		options: {
			loaderName,
			callback(inspect: Inspection) {
				log(inspect.options.loaderName, inspect.context._module.resource);
			},
		},
	};
}
