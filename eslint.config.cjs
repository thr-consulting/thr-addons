const thxConfig = require('./packages/eslint-config-thx');

const typescriptOptions = {
	override: {
		languageOptions: {
			parserOptions: {
				project: ['./packages/*/tsconfig-eslint.json'],
				tsconfigRootDir: __dirname,
			},
		},
	},
};

const controlsOptions = {
	...typescriptOptions,
	react: true,
	override: {
		languageOptions: {
			parserOptions: {
				project: ['./packages/controls/tsconfig-eslint.json'],
				tsconfigRootDir: __dirname,
			},
		},
	},
};

const withFiles = (configs, files) => configs.map((config) => ({...config, files}));

module.exports = [
	{
		ignores: ['**/dist/**', '**/node_modules/**', '**/.eslintcache'],
	},
	...withFiles(thxConfig({typescript: false}), ['packages/**/*.{js,cjs,mjs}']),
	...withFiles(thxConfig(typescriptOptions), ['packages/*/src/**/*.{ts,tsx}']),
	...withFiles(thxConfig(controlsOptions), ['packages/controls/src/**/*.{ts,tsx}']),
];
