/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	mode: process.env.NODE_ENV,
	devtool: 'source-map',
	target: 'node',
	entry: './src/server/mongooseTypes/index.ts',
	output: {
		filename: 'mongooseTypes.js',
		path: path.resolve(__dirname),
		library: 'extrasmongoosetypes',
		libraryTarget: 'umd',
		umdNamedDefine: true,
		globalObject: 'this',
	},
	externals: [
		nodeExternals({modulesDir: path.join('..', '..', 'node_modules')}),
	],
	optimization: {
		minimize: false, // process.env.NODE_ENV === 'production',
	},
	resolve: {
		extensions: ['.js', '.mjs', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.[tj]sx?$/,
				exclude: '/node_modules/',
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [['@imperium/babel-preset-imperium', {typescript: true}]],
						},
					},
				],
			},
		],
	},
};