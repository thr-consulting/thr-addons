import type { API, FileInfo, JSCodeshift, Collection } from 'jscodeshift';

export function fixRepoName(root: Collection, j: JSCodeshift, fileInfo: FileInfo): void {
	root.find(j.MethodDefinition, { kind: 'constructor' }).forEach(path => {
		const ctor = path.value;

		const superCall = j(ctor).find(j.CallExpression, {
			callee: { type: 'Super' },
		});
		if (!superCall.size()) return;

		const superNode = superCall.get(0).node;
		const args = superNode.arguments;
		if (args.length < 1) return; // Too few arguments

		const repoArg = args[1];
		if (!repoArg || repoArg.type !== 'Identifier') return;

		const repoIdentifier = repoArg.name;

		// Match constructor param corresponding to the repo argument
		const repoParam = ctor.value.params.find(
			(p): p is typeof p & { typeAnnotation: any } =>
				p.type === 'Identifier' &&
				p.name === repoIdentifier &&
				'typeAnnotation' in p
		);
		if (!repoParam || !repoParam.typeAnnotation) return;

		const typeAnnotation = repoParam.typeAnnotation.typeAnnotation;
		if (
			typeAnnotation.type !== 'TSTypeReference' ||
			typeAnnotation.typeName.type !== 'Identifier' ||
			typeAnnotation.typeName.name !== 'EntityRepository' ||
			!typeAnnotation.typeParameters ||
			typeAnnotation.typeParameters.params.length < 1
		) return;

		const entityType = typeAnnotation.typeParameters.params[0];
		if (entityType.type !== 'TSTypeReference' || entityType.typeName.type !== 'Identifier') return;

		const expectedName = entityType.typeName.name;

		// CASE 1: If first arg exists but is wrong, fix it
		if (args[0]?.type === 'Literal') {
			const literal = args[0];
			if (literal.value !== expectedName) {
				literal.value = expectedName;
			}
		}

		// CASE 2: If first arg is missing, insert it
		if (!args[0] || args[0].type !== 'Literal') {
			superNode.arguments = [
				j.literal(expectedName),
				...superNode.arguments,
			];
		}
	});
}
