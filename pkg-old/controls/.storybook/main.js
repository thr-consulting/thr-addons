const util = require('util');
const compact = require('lodash/compact');
const webpackConfig = require('../webpack');

module.exports = {
	core: {
		builder: 'webpack5',
	},
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-actions'],
	webpackFinal: config => {
		const theirs = {...config};

		// console.log(util.inspect(theirs, true, null, true));

		// This is dependant on storybook's config
		delete theirs.module.rules[0];
		delete theirs.module.rules[1];
		delete theirs.module.rules[7];
		delete theirs.module.rules[8];
		delete theirs.module.rules[9];

		const ourRules = [...webpackConfig.module.rules];
		// This is highly dependant on @thx/common-webpack config
		ourRules[0].use[1].options = {...ourRules[0].use[1].options, sourceType: 'unambiguous'};
		ourRules[1].use[1].options = {...ourRules[1].use[1].options, sourceType: 'unambiguous'};
		ourRules[1].use[1].options.presets[0][1].reactRefresh = false;

		const cnf = {
			...config,
			resolve: webpackConfig.resolve,
			plugins: compact(theirs.plugins),
			module: {
				rules: [...compact(theirs.module.rules), ...ourRules],
			},
		};
		cnf.resolve.fallback = {path: false, crypto: false, assert: false};

		// console.log(util.inspect(theirs, true, null, true));

		return cnf;
	},
};
