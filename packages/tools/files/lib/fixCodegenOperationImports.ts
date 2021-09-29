import type {Collection, JSCodeshift} from 'jscodeshift';

export function fixCodegenOperationImports(root: Collection, j: JSCodeshift) {
	// Find the `Operations` namespace import and replace with a default import instead
	root.find(j.ImportNamespaceSpecifier, {local: {name: 'Operations'}}).replaceWith(() => {
		return j.importDefaultSpecifier(j.identifier('Operations'));
	});

	// Find the `Operations` member expressions and replace with just `Operations` instead.
	root.find(j.MemberExpression, {object: {name: 'Operations'}}).replaceWith('Operations');
}
