/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: process.env.NODE_ENV,
	devtool: 'source-map',
	entry: './src/client/index.ts',
	output: {
		filename: 'client.js',
		path: path.resolve(__dirname, 'lib'),
		library: 'extrasclient',
		libraryTarget: 'umd',
		umdNamedDefine: true,
		globalObject: 'this',
	},
	externals: [
		nodeExternals({modulesDir: path.join('..', '..', 'node_modules')}),
	],
	optimization: {
		minimize: process.env.NODE_ENV === 'production',
	},
	resolve: {
		extensions: ['.js', '.mjs', '.ts', '.tsx'],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
						},
					},
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
				use: [{loader: 'url-loader', query: {limit: 30000}}],
			},
			{
				test: /\.[tj]sx?$/,
				exclude: '/node_modules/',
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [['@imperium/babel-preset-imperium', {client: true, typescript: true}]],
						},
					},
				],
			},
		],
	},
};
