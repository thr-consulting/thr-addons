# @thx/eslint-config-thx

This package exports a factory that returns ESLint flat configuration objects. It keeps the shared Airbnb, TypeScript, React, Jest, and Prettier rules while adapting the legacy third-party configurations for flat config.

```js
const thxConfig = require('@thx/eslint-config-thx');

module.exports = [
	...thxConfig({typescript: false}).map((config) => ({...config, files: ['**/*.js']})),
	...thxConfig({
		typescript: true,
		override: {
			languageOptions: {
				parserOptions: {
					project: ['./tsconfig.eslint.json'],
					tsconfigRootDir: __dirname,
				},
			},
		},
	}).map((config) => ({...config, files: ['**/*.ts', '**/*.tsx']})),
];
```

The factory accepts `typescript` (default `true`), `react` (default `false`), `jest` (default `false`), and `debug` (default `false`). An `override` may be a legacy ESLint configuration object merged before conversion or a flat configuration object/array appended to the returned configuration. The existing `ESLINT_CONFIG_THX` environment variable remains supported; its JSON options are defaults that explicit factory options can override.

Flat-format overrides are useful for parser project settings, globals, and file-specific rules. Legacy configurations are translated with `FlatCompat`; modern overrides are returned unchanged at the end so they take precedence.
