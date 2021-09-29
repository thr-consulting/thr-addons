import type {FileInfo, API} from 'jscodeshift';
import path from 'path';
import {addTypescriptUtilityTypes} from './lib/addTSUtilities';
import {genTSEnumLookups} from './lib/genTSEnumLookups';
import {checkIfCodegenOperationsFile} from './lib/checkIfCodegenOperationsFile';
import {fixCodegenOperationImports} from './lib/fixCodegenOperationImports';
import {addCustomGraphqlType} from './lib/addCustomGraphqlType';

export default function transform(fileInfo: FileInfo, api: API) {
	const j = api.jscodeshift;
	const root = j(fileInfo.source);

	const parsedFileInfo = path.parse(path.resolve(fileInfo.path));

	// Check if codegen types file
	if (parsedFileInfo.base === 'graphql.ts') {
		genTSEnumLookups(root, j);

		// Check if web codegen file
		if (/web\/src\/core$/.test(parsedFileInfo.dir)) {
			addTypescriptUtilityTypes(root, j);
		}
	}

	// Check if codegen operations file
	if (checkIfCodegenOperationsFile(root, j)) {
		fixCodegenOperationImports(root, j);
		addCustomGraphqlType(root, j);
	}

	return root.toSource({quote: 'single'});
}
