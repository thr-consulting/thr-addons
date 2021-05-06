/**
 * This file is basically from: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/webpack-node-externals/index.d.ts
 * TODO This file should be removed once webpack-node-externals supports Webpack 5 types.
 */
declare module 'webpack-node-externals' {
	import {Configuration} from 'webpack';

	type AllowlistOption = string | RegExp | AllowlistFunctionType;
	type ImportTypeCallback = (moduleName: string) => string;
	/** a function that accepts the module name and returns whether it should be included */
	type AllowlistFunctionType = (moduleName: string) => boolean;
	interface ModulesFromFileType {
		exclude?: string | string[];
		include?: string | string[];
	}

	interface Options {
		/**
		 * An array for the externals to allow, so they will be included in the bundle.
		 * Can accept exact strings ('module_name'), regex patterns (/^module_name/), or a
		 * function that accepts the module name and returns whether it should be included.
		 * Important - if you have set aliases in your webpack config with the exact
		 * same names as modules in node_modules, you need to allowlist them so Webpack will know
		 * they should be bundled.
		 * @default []
		 */
		allowlist?: AllowlistOption[] | AllowlistOption;
		/**
		 * @default ['.bin']
		 */
		binaryDirs?: string[];
		/**
		 * The method in which unbundled modules will be required in the code. Best to leave as
		 * 'commonjs' for node modules.
		 * @default 'commonjs'
		 */
		importType?: 'var' | 'this' | 'commonjs' | 'amd' | 'umd' | ImportTypeCallback;
		/**
		 * The folder in which to search for the node modules.
		 * @default 'node_modules'
		 */
		modulesDir?: string;
		/**
		 * Additional folders to look for node modules.
		 */
		additionalModuleDirs?: string[];
		/**
		 * Read the modules from the package.json file instead of the node_modules folder.
		 * @default false
		 */
		modulesFromFile?: boolean | ModulesFromFileType;
		/**
		 * @default false
		 */
		includeAbsolutePaths?: boolean;
	}

	function webpackNodeExternals(options?: Options): Configuration['externals'];

	export = webpackNodeExternals;
}
