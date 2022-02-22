import {resolve} from 'node:path';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import nodeExternals from 'rollup-plugin-node-externals';
import esbuild from 'rollup-plugin-esbuild';
import renameNodeModules from 'rollup-plugin-rename-node-modules';

export function rollupLibConfig(opts) {
	const {name, srcPath, mode, type} = opts;

	const isProduction = mode === 'production';
	const sourcePath = srcPath || 'src';

	const extensions = ['.js', '.ts'];

	if (type === 'web') {
		extensions.push('.tsx');
	}

	const plugins = [
		nodeExternals(),
		renameNodeModules('external'),
		nodeResolve({extensions}),
		esbuild({
			minify: isProduction,
			sourceMap: !isProduction,
			tsconfig: resolve(process.cwd(), 'tsconfig.json'),
		}),
	];

	if (type === 'web') {
		plugins.push(
			postcss({
				autoModules: true,
			}),
		);
	}

	return [
		{
			input: `${sourcePath}/index.ts`,
			output: {
				name,
				format: 'esm',
				externalLiveBindings: false,
				dir: 'dist/esm',
				preserveModules: true,
				preserveModulesRoot: sourcePath,
				sourcemap: false,
			},
			plugins,
		},
	];
}
