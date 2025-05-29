/* eslint-disable no-console */
const merge = require('lodash/merge');

let options = {
	typescript: true,
	react: false,
	jest: false,
	debug: false,
	// override: {},
};

if (process.env.ESLINT_CONFIG_THX) {
	options = merge(options, JSON.parse(process.env.ESLINT_CONFIG_THX));
}

let config = {
	plugins: ['unused-imports', options.jest && 'jest', options.react && 'react-hooks', options.typescript && '@typescript-eslint'].filter(Boolean),
	extends: [
		options.react && 'airbnb',
		!options.react && 'airbnb-base',
		options.typescript && options.react && '@kesills/airbnb-typescript',
		options.typescript && !options.react && '@kesills/airbnb-typescript/base',
		options.react && 'plugin:react/recommended',
		// Uses the recommended rules from the @typescript-eslint/eslint-plugin
		options.typescript && 'plugin:@typescript-eslint/recommended',
		// Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
		'plugin:prettier/recommended',
	].filter(Boolean),
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module',
	},
	env: {
		es2021: true,
	},
	rules: {
		// General
		'no-underscore-dangle': ['warn', {allowAfterThis: true, allow: ['_id']}],
		'class-methods-use-this': 'off',
		'global-require': 'error',
		'prefer-arrow-callback': ['error', {allowNamedFunctions: true}],
		'no-return-assign': ['error', 'except-parens'],
		'no-console': ['error'],
		'no-plusplus': 'off',
		'no-unused-vars': ['error', {varsIgnorePattern: 'd', argsIgnorePattern: 'server|context|ctx|type'}],
		// 'lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: true}],
		'lines-between-class-members': ['off'],
		'no-use-before-define': ['off'],
		'func-names': ['error', 'always'],
		'no-alert': ['error'],

		// ES6 Import
		'import/no-extraneous-dependencies': 'off',
		'import/no-unresolved': 'off',
		'import/prefer-default-export': 'off',
		'import/extensions': 'off',
		'import/no-named-default': 'off',
		'import/no-default-export': 'off',
		'unused-imports/no-unused-imports': 'error',
	},
};

if (options.typescript) {
	config.parser = '@typescript-eslint/parser';

	config.rules = merge(config.rules, {
		// Typescript
		'@typescript-eslint/indent': ['off'],
		'@typescript-eslint/no-unused-vars': ['error', {varsIgnorePattern: 'd', argsIgnorePattern: 'server|context|ctx|type'}],
		'@typescript-eslint/no-unused-expressions': ['off'], // This was disabled because some upgrade to airbnb rules.
		'@typescript-eslint/explicit-member-accessibility': ['off'],
		'@typescript-eslint/explicit-function-return-type': ['off', {allowExpressions: true, allowTypedFunctionExpressions: true}],
		'@typescript-eslint/no-explicit-any': ['off'],
		'@typescript-eslint/ban-ts-ignore': ['off'],
		'@typescript-eslint/ban-ts-comment': ['off'],
		'@typescript-eslint/lines-between-class-members': ['off'],
		'@typescript-eslint/interface-name-prefix': ['off'],
		'@typescript-eslint/no-before-define': ['off'], // This was disabled to support optional chaining: https://github.com/typescript-eslint/typescript-eslint/issues/1116
		'@typescript-eslint/explicit-module-boundary-types': ['off'],
		'@typescript-eslint/no-floating-promises': 'error',
		'@typescript-eslint/await-thenable': 'error',
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				fixStyle: 'inline-type-imports',
			},
		],
		'@typescript-eslint/class-methods-use-this': ['off'],
	});
}

if (options.react) {
	config.parserOptions.ecmaFeatures = {
		jsx: true,
	};
	config.settings = {
		react: {
			version: 'detect',
		},
	};

	config.rules = merge(config.rules, {
		// React
		'react/jsx-uses-react': ['off'],
		'react/react-in-jsx-scope': ['off'],
		'react/forbid-prop-types': 'error',
		'react/jsx-indent': ['off'],
		'react/jsx-indent-props': ['off'],
		'react/jsx-filename-extension': ['error', {extensions: ['.tsx']}],
		'react/require-default-props': 'off',
		'react/prefer-stateless-function': 'error',
		'react/no-unknown-property': ['error', {ignore: ['for']}],
		'react/no-unused-prop-types': 'off',
		'react/no-typos': 'off',
		'react/no-children-prop': 'off',
		'react/destructuring-assignment': ['off', 'always'],
		'react/jsx-curly-newline': ['off'],
		'react/jsx-one-expression-per-line': 'off',
		'react/jsx-props-no-spreading': ['off'],
		'react/jsx-wrap-multilines': ['off'],
		'react/display-name': ['off'],
		'react/prop-types': ['off'],

		// JSX a11y
		'jsx-a11y/label-has-for': 'off',
		'jsx-a11y/anchor-is-valid': 'off',
		'jsx-a11y/label-has-associated-control': 'off',

		// React Hooks
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',
	});
} else {
	config.env.node = true;
}

if (options.jest) {
	config.env['jest/globals'] = true;
}

if (options.debug) {
	console.log('\nDEBUG @thx/eslint-config-thx\nESLINT CONFIG:\n');
	console.log(config);
}

if (options.override) {
	config = merge(config, options.override);
}

module.exports = config;
