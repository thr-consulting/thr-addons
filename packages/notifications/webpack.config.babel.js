import path from 'path';
import nodeExternals from 'webpack-node-externals';

const root = path.resolve(__dirname);

module.exports = {
	entry: './lib/index.js',
	target: 'node',
	devtool: 'source-map',
	externals: [nodeExternals()],
	output: {
		path: path.resolve(root, 'dist'),
		filename: 'index.js',
		library: 'notifications',
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
		],
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false,
		// 	},
		// 	sourceMap: true,
		// }),
	],
};
