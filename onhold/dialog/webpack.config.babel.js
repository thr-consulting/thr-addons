import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
	entry: {
		dialogButtons: './src/dialogButtons.css',
		dialogSystem: './src/dialogSystem.css',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		library: 'dialog',
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader'],
				}),
			},
		],
	},
	plugins: [
		new ExtractTextPlugin({
			filename: '[name].css',
			disable: false,
			allChunks: true,
		}),
	],
};
