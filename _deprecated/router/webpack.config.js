const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: process.env.NODE_ENV,
	devtool: 'source-map',
	entry: {
		router: './src/index.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'lib'),
		library: 'date',
		libraryTarget: 'umd',
		umdNamedDefine: true,
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
					'css-loader',
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
