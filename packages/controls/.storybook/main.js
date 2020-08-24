const webpackConfig = require('../webpack');
const compact = require('lodash/compact');

module.exports = {
	stories: ['../src/**/*.stories.[tj]sx'],
	webpackFinal: config => {
		const theirs = {...config};

		// This is dependant on storybook's config
		delete theirs.module.rules[0]; // Remove JS rule
		delete theirs.module.rules[2]; // Remove CSS rule
		delete theirs.plugins[6]; // Remove progress plugin

		const ourRules = [...webpackConfig.module.rules];
		// This is highly dependant on @thx/common-webpack config
		ourRules[1].use[1].options.presets[0][1].reactRefresh = false

		return {
			...config,
			resolve: webpackConfig.resolve,
			plugins: compact(theirs.plugins),
			module: {
				rules: [
					...ourRules,
					...compact(theirs.module.rules),
				],
			},
		};
	},
};
