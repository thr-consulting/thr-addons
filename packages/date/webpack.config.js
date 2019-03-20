const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	mode: process.env.NODE_ENV,
	devtool: 'source-map',
	entry: './src/index.js',
	output: {
		filename: 'date.js',
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
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [['@imperium/babel-preset-imperium']],
						},
					},
				],
			},
		],
	},
};
