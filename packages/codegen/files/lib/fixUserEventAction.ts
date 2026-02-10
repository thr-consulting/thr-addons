import type {Collection, FileInfo, JSCodeshift} from 'jscodeshift';
import path from 'path';

/**
 * Compute canonical action string for a controller method.
 * Pattern: <package>.<controller>.<method>
 *
 * Example:
 * packages/domain/src/accounting/controllers/FooController.ts -> package=accounting
 * class FooController -> controller=foo
 * method create -> action=accounting.foo.create
 */
function getActionString(filePath: string, className: string, methodName: string) {
	const parts = filePath.split(path.sep);

	// Find 'src' folder and take the next folder as package name
	const srcIndex = parts.findIndex(p => p === 'src');
	const packageName = srcIndex >= 0 && parts[srcIndex + 1] ? parts[srcIndex + 1] : 'unknown';

	// Controller name: strip 'Controller' and camelCase
	let controller = className.replace(/Controller$/, '');
	controller = controller.charAt(0).toLowerCase() + controller.slice(1);

	return `${packageName}.${controller}.${methodName}`;
}

export function fixUserEventAction(root: Collection, j: JSCodeshift, fileInfo: FileInfo) {
	// Find all classes
	root.find(j.ClassDeclaration).forEach(classPath => {
		const className = classPath.value.id?.name;
		if (!className) return;

		// Find all methods in the class (works for TS async methods)
		j(classPath)
			.find(j.ClassMethod)
			.forEach(methodPath => {
				const methodName = methodPath.value.key.type === 'Identifier' ? methodPath.value.key.name : null;
				if (!methodName) return;

				// Find all userEvent.record() calls inside this method
				j(methodPath)
					.find(j.CallExpression)
					.forEach(callPath => {
						const callee = callPath.value.callee;
						if (callee.type === 'MemberExpression' && callee.property.type === 'Identifier' && callee.property.name === 'record') {
							const args = callPath.value.arguments;
							if (!args[0] || args[0].type !== 'ObjectExpression') return;

							const actionProp = args[0].properties.find(
								p =>
									p.type === 'ObjectProperty' &&
									((p.key.type === 'Identifier' && p.key.name === 'action') || (p.key.type === 'StringLiteral' && p.key.value === 'action')),
							);

							if (actionProp && actionProp.type === 'ObjectProperty') {
								const canonicalAction = getActionString(fileInfo.path, className, methodName);

								// Only replace if it differs
								if (actionProp.value.type !== 'StringLiteral' || actionProp.value.value !== canonicalAction) {
									actionProp.value = j.stringLiteral(canonicalAction);
								}
							}
						}
					});
			});
	});
}
