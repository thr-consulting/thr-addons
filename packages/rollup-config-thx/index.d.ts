import type {RollupOptions} from 'rollup';
import type {RollupAliasOptions} from '@rollup/plugin-alias';

export interface RollupConfigOptions {
	name: string;
	srcPath?: string; // Defaults to `src`
	mode?: 'development' | 'production'; // Defaults to development
	type: 'web' | 'node';
	sourcemap?: boolean; // Defaults to true
	run?: string;
	delete?: boolean; // Defaults to true
}

export declare function rollupLibConfig(options: RollupConfigOptions, additionalConfig?: RollupOptions): RollupOptions;
