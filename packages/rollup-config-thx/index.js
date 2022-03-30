import {resolve} from 'node:path';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {cwd} from 'node:process';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import nodeExternals from 'rollup-plugin-node-externals';
import esbuild from 'rollup-plugin-esbuild-transform';
import renameNodeModules from 'rollup-plugin-rename-node-modules';
import runPlugin from '@rollup/plugin-run';
import {merge} from 'lodash-es';
import aliasPlugin from '@rollup/plugin-alias';
import delPlugin from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import analyze from 'rollup-plugin-analyzer';
import visualizer from 'rollup-plugin-visualizer';

export function rollupLibConfig(opts, additionalConfig, modifier) {
	const {name, srcPath, mode, type, sourcemap, run, delete: del, analysis} = opts;

	// Variables
	const isProduction = mode === 'production';
	const sourcePath = srcPath || 'src';
	const createSourcemaps = !(typeof sourcemap === 'boolean' && sourcemap === false);
	const extensions = ['.js', '.ts'];
	const tsconfigPath = resolve(cwd(), 'tsconfig.json');
	const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));

	// Process TSX files as well if type is web
	if (type === 'web') {
		extensions.push('.tsx');
	}

	// Base plugins
	const plugins = [
		commonjs(),
		nodeExternals(),
		renameNodeModules('external'),
		nodeResolve({extensions}),
		esbuild([
			{
				loader: 'json',
			},
			{
				loader: 'ts',
			},
			{
				loader: 'tsx',
				banner: "import React from 'react'",
			},
			{
				minify: isProduction,
				tsconfigRaw: tsconfig,
				sourcemap: createSourcemaps,
				target: 'esnext',
			},
		]),
	];

	// If a tsconfig.json is present, check for aliases and add if needed
	if (existsSync(tsconfigPath)) {
		if (tsconfig.compilerOptions?.paths) {
			plugins.push(
				aliasPlugin({
					entries: Object.entries(tsconfig.compilerOptions.paths).map(([alias, value]) => ({
						find: new RegExp(`${alias.replace('/*', '')}`),
						replacement: resolve(cwd(), `${value[0].replace('/*', '')}`),
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
				execPath: 'node',
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

	let config = {
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
		config = merge(config, additionalConfig);
	}

	if (!(typeof analysis === 'boolean' && analysis === false)) {
		config.plugins.push(
			analyze({
				summaryOnly: true,
				writeTo: a => {
					writeFileSync(resolve(cwd(), 'dist/stats.txt'), a);
				},
			}),
			visualizer.default({
				filename: './dist/stats.html',
				gzipSize: true,
				brotliSize: true,
				template: 'treemap',
			}),
		);
	}

	if (modifier) {
		config = modifier(config);
	}

	return config;
}
