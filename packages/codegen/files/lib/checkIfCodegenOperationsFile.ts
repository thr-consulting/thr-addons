import type {Collection, JSCodeshift} from 'jscodeshift';

export function checkIfCodegenOperationsFile(root: Collection, j: JSCodeshift) {
	// Search through imports to determine if any of them match graphql criteria
	const imp = root.find(j.ImportDeclaration).filter(pth => {
		const operationsImport = pth.node.source.type === 'StringLiteral' ? /\.graphql$/.test(pth.node.source.value) : false;
		if (pth.node.specifiers.length === 0) {
			return false;
		}
		const isNamespaceImport = pth.node.specifiers[0].type === 'ImportNamespaceSpecifier';
		return operationsImport && isNamespaceImport;
	});
	return imp.length !== 0;
}
