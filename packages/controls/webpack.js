/* eslint-disable @typescript-eslint/no-var-requires */
const {commonWebpack, inspectLoader} = require('@imperium/util');
const {name} = require('./package.json');

const commonWebpackConfig = commonWebpack({
	isProduction: process.env.NODE_ENV === 'production',
	isClient: true,
	name,
	entry: './index.ts',
	outputFile: 'index.js',
});

module.exports = {
	...commonWebpackConfig,
	module: {
		rules: [
			...commonWebpackConfig.module.rules,
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					inspectLoader('CSS-MODULE'),
					{loader: 'style-loader'},
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[path][name]__[local]--[hash:base64:5]',
							},
						},
					},
				],
			},
			{
				test: /\.css$/,
				include: /node_modules/,
				use: [
					inspectLoader('CSS'),
					{loader: 'style-loader'},
					{
						loader: 'css-loader',
						options: {
							modules: false,
						},
					},
				],
			},
		],
	},
};
