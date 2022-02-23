import type {RollupOptions} from 'rollup';

export interface RollupConfigOptions {
	name: string;
	srcPath?: string;
	mode?: 'development' | 'production';
	type: 'web' | 'node';
}

export declare function rollupLibConfig(options: RollupConfigOptions): RollupOptions;
