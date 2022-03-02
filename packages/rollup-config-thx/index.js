import {resolve} from 'node:path';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import nodeExternals from 'rollup-plugin-node-externals';
import esbuild from 'rollup-plugin-esbuild';
import renameNodeModules from 'rollup-plugin-rename-node-modules';
import runPlugin from '@rollup/plugin-run';
import {merge} from 'lodash-es';
import aliasPlugin from '@rollup/plugin-alias';
import {existsSync, readFileSync} from 'node:fs';
import delPlugin from 'rollup-plugin-delete';

export function rollupLibConfig(opts, additionalConfig) {
	const {name, srcPath, mode, type, sourcemap, run, delete: del} = opts;

	// Variables
	const isProduction = mode === 'production';
	const sourcePath = srcPath || 'src';
	const createSourcemaps = !(typeof sourcemap === 'boolean' && sourcemap === false);
	const extensions = ['.js', '.ts'];
	const tsconfigPath = resolve(process.cwd(), 'tsconfig.json');

	// Process TSX files as well if type is web
	if (type === 'web') {
		extensions.push('.tsx');
	}

	// Base plugins
	const plugins = [
		nodeExternals(),
		renameNodeModules('external'),
		nodeResolve({extensions}),
		esbuild({
			minify: isProduction,
			sourceMap: createSourcemaps,
			tsconfig: tsconfigPath,
			target: 'esnext',
		}),
	];

	// If a tsconfig.json is present, check for aliases and add if needed
	if (existsSync(tsconfigPath)) {
		const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
		if (tsconfig.compilerOptions?.paths) {
			plugins.push(
				aliasPlugin({
					entries: Object.entries(tsconfig.compilerOptions.paths).map(([alias, value]) => ({
						find: new RegExp(`${alias.replace('/*', '')}`),
						replacement: resolve(process.cwd(), `${value[0].replace('/*', '')}`),
					})),
				}),
			);
		}
	}

	// Process CSS files if type is web
	if (type === 'web') {
		plugins.push(
			postcss({
				autoModules: true,
			}),
		);
	}

	// Add run plugin if we are running a yarn command
	if (run) {
		plugins.push(
			runPlugin({
				execPath: 'yarn',
				execArgv: run.split(' '),
				allowRestarts: true,
			}),
		);
	}

	if (!(typeof del === 'boolean' && del === false)) {
		plugins.push(
			delPlugin({
				targets: ['dist/esm/*'],
			}),
		);
	}

	const config = {
		input: `${sourcePath}/index.ts`,
		output: {
			name,
			format: 'esm',
			externalLiveBindings: false,
			dir: 'dist/esm',
			preserveModules: true,
			preserveModulesRoot: sourcePath,
			sourcemap: createSourcemaps,
		},
		plugins,
		watch: {
			clearScreen: !run,
		},
	};

	if (additionalConfig) {
		return merge(config, additionalConfig);
	}

	return config;
}
