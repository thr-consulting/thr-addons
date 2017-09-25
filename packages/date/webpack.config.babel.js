import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
	entry: {
		styles: './src/styles.css',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		library: 'date',
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader'],
				}),
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
				use: [{loader: 'url-loader', query: {limit: 10000}}],
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
