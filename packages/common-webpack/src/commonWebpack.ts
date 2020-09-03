import path from 'path';
import type {Configuration} from 'webpack';
import nodeExternals from 'webpack-node-externals';
import process from 'process';
import inspectLoader from './inspectLoader';

interface CommonWebpackParams {
	isProduction: boolean;
	isClient: boolean;
	name: string;
	entry: string;
	outputFile: string;
	rules?: any[];
	jsxFactory?: string;
}

export default function commonWebpack({isProduction, isClient, name, entry, outputFile, rules, jsxFactory}: CommonWebpackParams): Configuration {
	return {
		entry,
		mode: isProduction ? 'production' : 'development',
		context: path.resolve(process.cwd(), 'src'),
		target: isClient ? 'web' : 'node',
		devtool: isProduction ? 'source-map' : 'inline-source-map',
		externals: [
			nodeExternals({modulesDir: 'node_modules'}),
			nodeExternals({modulesDir: path.join('..', 'node_modules')}),
			nodeExternals({modulesDir: path.join('..', '..', 'node_modules')}),
			nodeExternals({modulesDir: path.join('..', '..', '..', 'node_modules')}),
		],
		output: {
			filename: isProduction ? `${path.basename(outputFile, path.extname(outputFile))}.min.js` : outputFile,
			path: path.resolve(process.cwd(), 'dist'),
			library: name,
			libraryTarget: 'commonjs2',
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
								presets: [['@imperium/babel-preset-imperium', {client: isClient}]],
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
								presets: [['@imperium/babel-preset-imperium', {client: isClient, typescript: true, jsxFactory}]],
							},
						},
					],
				},
			].concat(rules || []),
		},
	};
}