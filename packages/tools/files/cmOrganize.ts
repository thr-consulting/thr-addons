import type {FileInfo, API} from 'jscodeshift';
import {fixDebugNamespace} from './lib/fixDebugNamespace';
import {renameAliasImports} from './lib/renameAliasImports';
import {sortImports} from './lib/sortImports';

export default function transform(fileInfo: FileInfo, api: API) {
	const j = api.jscodeshift;
	const root = j(fileInfo.source);

	renameAliasImports(root, j, fileInfo);
	sortImports(root, j);
	fixDebugNamespace(root, j, fileInfo);

	return root.toSource({quote: 'single'});
}
