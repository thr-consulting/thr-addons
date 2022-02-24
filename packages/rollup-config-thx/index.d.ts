import type {RollupOptions} from 'rollup';

export interface RollupConfigOptions {
	name: string;
	srcPath?: string; // Defaults to `src`
	mode?: 'development' | 'production'; // Defaults to development
	type: 'web' | 'node';
	sourcemap?: boolean; // Defaults to true
	run?: string;
}

export declare function rollupLibConfig(options: RollupConfigOptions): RollupOptions;
