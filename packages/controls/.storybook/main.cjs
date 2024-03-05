const {
    dirname,
    join
} = require("path");

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [getAbsolutePath("@storybook/addon-links"), getAbsolutePath("@storybook/addon-essentials"), getAbsolutePath("@storybook/addon-interactions")],

    framework: {
        name: getAbsolutePath("@storybook/react-vite"),
        options: {}
    },

    async viteFinal(config) {
		return {
			...config,
			// esbuild: {
			// 	...config.esbuild,
			// 	jsxInject: `import React from 'react'`,
			// },
			rollupOptions: {
				...config.rollupOptions,
				// Externalize deps that shouldn't be bundled
				external: ['react', 'react-dom'],
				output: {
					// Global vars to use in UMD build for externalized deps
					globals: {
						react: 'React',
						'react-dom': 'ReactDOM',
					},
				},
			},
			// define: {
			// 	...config.define,
			// 	global: 'window',
			// },
		};
	},

    docs: {
        autodocs: true
    }
};

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}
