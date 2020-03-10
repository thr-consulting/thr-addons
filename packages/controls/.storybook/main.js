const webpackConfig = require('../webpack');
const compact = require('lodash/compact');

module.exports = {
	stories: ['../src/**/*.stories.[tj]sx'],
	webpackFinal: config => {
		const theirs = {...config};

		delete theirs.module.rules[0]; // Remove JS rule
		delete theirs.module.rules[2]; // Remove CSS rule
		delete theirs.plugins[6]; // Remove progress plugin

		const b = {
			...config,
			resolve: webpackConfig.resolve,
			plugins: compact(theirs.plugins),
			module: {
				rules: [...webpackConfig.module.rules, ...compact(theirs.module.rules)],
			},
		};

		return b;
	},
};
