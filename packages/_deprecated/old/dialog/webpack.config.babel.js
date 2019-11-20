const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		dialogButtons: './src/DialogButtons/dialogButtons.css',
		dialogSystem: './src/DialogSystem/dialogSystem.css',
	},
	mode: process.env.NODE_ENV,
	output: {
		path: path.resolve(__dirname, 'dist'),
		// filename: '[name].js',
		// library: 'dialog',
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
	],
};
