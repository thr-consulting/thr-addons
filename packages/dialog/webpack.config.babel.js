import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import cssModulesValues from 'postcss-modules-values';

const root = path.resolve(__dirname);

module.exports = {
	entry: './lib/index.js',
	target: 'node',
	devtool: 'source-map',
	externals: [nodeExternals()],
	output: {
		path: path.resolve(root, 'dist'),
		filename: 'index.js',
		library: 'dialog',
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [
								['es2015', {loose: true, modules: false}],
								'stage-1',
								'react',
								'flow',
							],
							plugins: [
								'flow-react-proptypes',
							],
						},
					},
				],
			},
			{
				test: /.css$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							query: {
								modules: true,
								importLoaders: 1,
								localIdentName: '[name]_[local]_[hash:base64:5]',
							},
						},
						{
							loader: 'postcss-loader',
						},
					],
				}),
			},
		],
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [cssModulesValues],
			},
		}),
		new ExtractTextPlugin({
			filename: 'index.css',
			disable: false,
			allChunks: true,
		}),
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false,
		// 	},
		// 	sourceMap: true,
		// }),
	],
};
