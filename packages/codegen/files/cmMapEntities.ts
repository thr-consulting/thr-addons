import type {FileInfo, API, Decorator} from 'jscodeshift';
import {appendFileSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import {env} from 'node:process';
import findRoot from 'find-root';

const isDebug = env.DEBUG_MODE === '1';

/*
	This codemod scans for classes that have the @Entity decorator and
	stores them in a temporary file
*/

export default function transform(fileInfo: FileInfo, api: API) {
	const j = api.jscodeshift;
	const root = j(fileInfo.source);

	let entity: string | null = null;
	root.find(j.ClassDeclaration).forEach(v => {
		// @ts-ignore
		if (!v.node.decorators) return;

		// @ts-ignore
		const decs = v.node.decorators as Decorator[];
		if (decs) {
			const entities = decs.map((h: Decorator) => {
				if (h.expression.type === 'CallExpression' && h.expression.callee.type === 'Identifier') {
					if (h.expression.callee.name === 'Entity') {
						// @ts-ignore
						return v.node.id.name;
					}
				}
				return null;
			}).filter(h => !!h);

			if (entities.length > 1) throw new Error('Cannot have multiple entities per file');
			if (entities.length === 1) entity = entities[0];
		}
	});

	if (entity) {
		const packageJsonPath = join(findRoot(fileInfo.path), 'package.json');
		const {name} = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

		if (isDebug) console.log(`Found entity "${entity}" in: ${name} at ${fileInfo.path}`);

		appendFileSync('/tmp/imp_codegen_entity_map.txt', `${entity},${fileInfo.path},${name}\n`);
	}

	return null;
}
