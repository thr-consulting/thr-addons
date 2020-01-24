const webpackConfig = require('../webpack');

module.exports = {
	stories: ['../src/**/*.stories.[tj]sx'],
	webpackFinal: config => {
		return {
			...config,
			resolve: {...config.resolve, ...webpackConfig.resolve},
			module: {...config.module, ...webpackConfig.module},
			// ...{module: {rules: {
			//
			// 		}}}
		};
	},
};
