interface Tsconfig {
	compilerOptions: {
		paths: {
			[key: string]: string[];
		};
	};
}

export function getTsconfigAliasPaths(tsconfig: Tsconfig, manualAliasPaths?: Record<string, string>) {
	if (tsconfig.compilerOptions && tsconfig.compilerOptions.paths) {
		return {
			...manualAliasPaths,
			...Object.keys(tsconfig.compilerOptions.paths).reduce((memo, key): Record<string, string> => {
				const valueArray = tsconfig.compilerOptions.paths[key];
				if (!Array.isArray(valueArray) || valueArray.length !== 1) {
					throw new Error('tsconfig.json compilerOptions.paths must contain only a single path');
				}
				const value = valueArray[0];

				if (key.includes('/*')) {
					if (!value.includes('*')) {
						throw new Error('tsconfig.json compilerOptions.paths must include a /* if the key includes a /*');
					}
					const newKey = key.substring(0, key.indexOf('/'));
					const newValue = value.substring(0, value.indexOf('/*'));
					return {
						...memo,
						[newKey]: newValue,
					};
				}
				return {
					...memo,
					[key]: value,
				};
			}, {}),
		};
	}
	return null;
}
