import type {Collection, FileInfo, JSCodeshift} from 'jscodeshift';
import path from 'path';

export function fixRepositorySuperName(root: Collection, j: JSCodeshift, fileInfo: FileInfo) {
	const re = new RegExp(`${process.env.PACKAGE_DIR}\/(.+)\/src\\/(.*)`)
	const match = re.exec(fileInfo.path);
	if (!match) return;

	const pkgName = match[1]; // e.g., @tacs/domain
	if (pkgName !== 'domain') return; // Only proceed if package is "domain"
	const relPath = match[2]; // e.g., tasks/repositories/SomeFile.ts
	const parsed = path.parse(relPath);

	// Only apply to files inside a "repositories" directory
	const dirParts = parsed.dir.split(path.sep);
	if (!dirParts.includes('repositories')) return;

	// Drop 'Repository' suffix if present
	const entityName = parsed.name.replace(/Repository$/, '');

	// Find the super(...) call inside the constructor and update its argument
	root.find(j.ClassDeclaration, {type: 'ClassDeclaration'}).forEach(classPath => {
		const className = classPath.value.id?.name;

		const body = classPath.value.body.body;

		body.forEach(member => {
			if (member.type === 'ClassMethod' && member.kind === 'constructor') {
				member.body.body.forEach(statement => {
					if (
						statement.type === 'ExpressionStatement' &&
						statement.expression.type === 'CallExpression' &&
						statement.expression.callee.type === 'Super'
					) {
						const args = statement.expression.arguments;
						if (args.length > 0 && args[0].type === 'StringLiteral') {
							args[0].value = entityName;
						}
					}
				});
			}
		});
	});
}
