const webpackConfig = require('../webpack');

module.exports = {
	stories: ['../src/**/*.stories.[tj]sx'],
	webpackFinal: config => ({
		...config,
		resolve: {...config.resolve, ...webpackConfig.resolve},
		module: {...config.module, ...webpackConfig.module},
	}),
};
