import {resolve} from 'node:path';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import nodeExternals from 'rollup-plugin-node-externals';
import esbuild from 'rollup-plugin-esbuild';
import renameNodeModules from 'rollup-plugin-rename-node-modules';
import runPlugin from '@rollup/plugin-run';

export function rollupLibConfig(opts) {
	const {name, srcPath, mode, type, sourcemap, run} = opts;

	const isProduction = mode === 'production';
	const sourcePath = srcPath || 'src';
	const createSourcemaps = !(typeof sourcemap === 'boolean' && sourcemap === false);

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
			sourceMap: createSourcemaps,
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

	if (run) {
		plugins.push(
			runPlugin({
				execPath: 'yarn',
				execArgv: run.split(' '),
				allowRestarts: true,
			}),
		);
	}

	return {
		input: `${sourcePath}/index.ts`,
		output: {
			name,
			format: 'esm',
			externalLiveBindings: false,
			dir: 'dist/esm',
			preserveModules: true,
			preserveModulesRoot: sourcePath,
			sourcemap: createSourcemaps,
		},
		plugins,
		watch: {
			clearScreen: false,
		},
	};
}
