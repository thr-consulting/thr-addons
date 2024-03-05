import type {RollupOptions} from 'rollup';

export interface RollupConfigOptions {
	name: string;
	srcPath?: string; // Defaults to `src`
	mode?: 'development' | 'production'; // Defaults to development
	type: 'web' | 'node';
	sourcemap?: boolean; // Defaults to true
	run?: string;
	delete?: boolean; // Defaults to true
	analysis?: boolean; // Defaults to true
	commonjsOpts?: Record<string, any>;
}

export type RollupConfigModifier = (config: RollupOptions) => RollupOptions;

export declare function rollupLibConfig(options: RollupConfigOptions, additionalConfig?: RollupOptions, modifier?: RollupConfigModifier): RollupOptions;
