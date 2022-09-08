import type {Collection, JSCodeshift} from 'jscodeshift';

export function fixCodegenOperationImports(root: Collection, j: JSCodeshift) {
	// Fix files that have been given the `.graphql.js` extension to just be `.graphql`
	root.find(j.ImportDeclaration).filter(pth => {
		const operationsImport = pth.node.source.type === 'StringLiteral' ? /\.graphql\.js$/.test(pth.node.source.value) : false;
		if (pth.node.specifiers.length === 0) {
			return false;
		}
		const isNamespaceImport = pth.node.specifiers[0].type === 'ImportNamespaceSpecifier';
		return operationsImport && isNamespaceImport;
	}).forEach(v => {
		v.node.source.value = v.node.source.value.replace('.graphql.js', '.graphql');
	});

	// Find the `Operations` namespace import and replace with a default import instead
	root.find(j.ImportNamespaceSpecifier, {local: {name: 'Operations'}}).replaceWith(() => {
		return j.importDefaultSpecifier(j.identifier('Operations'));
	});

	// Find the `Operations` member expressions and replace with just `Operations` instead.
	root.find(j.MemberExpression, {object: {name: 'Operations'}}).replaceWith('Operations');
}
