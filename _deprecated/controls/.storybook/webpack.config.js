const path = require('path');
// Export a function. Accept the base config as the only param.
module.exports = async ({config, mode}) => {
	config.module.rules = config.module.rules.filter(
		f => f.test.toString() !== '/\\.css$/'
	);

	config.module.rules.push({
		test: /\.(ts|tsx)$/,
		use: [
			{
				loader: 'babel-loader',
				options: {
					babelrc: false,
					presets: [['@imperium/babel-preset-imperium', {client: true, typescript: true}]],
				},
			},
		],
	});
	config.resolve.extensions.push('.ts', '.tsx');
	config.module.rules.push({
		test: /\.css$/,
		use: [
			{loader: 'style-loader'},
			{
				loader: 'css-loader',
				options: {
					modules: true,
				},
			},
		],
		include: path.resolve(__dirname, '../src'),
	});
	config.module.rules.push({
		test: /\.css$/,
		use: [
			{loader: 'style-loader'},
			{loader: 'css-loader'},
		],
		include: path.resolve(__dirname, '../../../node_modules/'),
	});

	return config;
};
