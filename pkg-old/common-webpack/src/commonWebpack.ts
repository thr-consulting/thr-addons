import path from 'path';
import process from 'process';
import type {Configuration} from 'webpack';
import nodeExternals from 'webpack-node-externals';
import {inspectLoader} from './inspectLoader';

interface CommonWebpackParams {
	isProduction: boolean;
	isClient: boolean;
	entry: string;
	outputFile: string;
	rules?: any[];
	jsxFactory?: string;
	aliasPaths?: {
		[key: string]: string;
	};
}

export function commonWebpack({isProduction, isClient, entry, outputFile, rules, jsxFactory, aliasPaths}: CommonWebpackParams): Configuration {
	return {
		entry,
		mode: isProduction ? 'production' : 'development',
		context: path.resolve(process.cwd(), 'src'),
		target: isClient ? 'web' : 'node',
		devtool: isProduction ? 'source-map' : 'inline-source-map',
		externals: nodeExternals({
			additionalModuleDirs: [
				path.join('node_modules'),
				path.join('..', 'node_modules'),
				path.join('..', '..', 'node_modules'),
				path.join('..', '..', '..', 'node_modules'),
			],
		}),
		output: {
			filename: isProduction ? `${path.basename(outputFile, path.extname(outputFile))}.min.js` : outputFile,
			path: path.resolve(process.cwd(), 'dist'),
			library: {
				type: 'commonjs2',
			},
		},
		resolve: {
			extensions: ['.js', '.mjs', '.ts', '.d.ts'].concat(isClient || jsxFactory ? ['.tsx'] : []), // .concat(jsxFactory ? ['.jsx'] : []),
		},
		optimization: {
			minimize: isProduction,
			nodeEnv: false,
		},
		module: {
			rules: [
				{
					// test: jsxFactory ? /\.jsx?$/ : /\.js$/,
					test: /\.js$/,
					exclude: /node_modules/,
					use: [
						inspectLoader('BABEL'),
						{
							loader: 'babel-loader',
							options: {
								babelrc: false,
								presets: [['@imperium/babel-preset-imperium', {client: isClient, alias: aliasPaths}]],
							},
						},
					],
				},
				{
					test: isClient || jsxFactory ? /\.tsx?$/ : /\.ts$/,
					exclude: /node_modules/,
					use: [
						inspectLoader('BABEL-TS'),
						{
							loader: 'babel-loader',
							options: {
								babelrc: false,
								presets: [['@imperium/babel-preset-imperium', {client: isClient, typescript: true, jsxFactory, alias: aliasPaths}]],
							},
						},
					],
				},
			].concat(rules || []),
		},
	};
}
