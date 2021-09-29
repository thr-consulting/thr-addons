import type {FileInfo, API, Decorator} from 'jscodeshift';
import {appendFileSync} from 'fs';
import {relative, parse, sep} from 'path';

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
		// const relativePath = parse(relative('./packages/server/src/core', fileInfo.path));
		// appendFileSync('/tmp/imp_codegen_entity_map.txt', `${entity},${relativePath.dir}${sep}${relativePath.name}#${entity}\n`);
		appendFileSync('/tmp/imp_codegen_entity_map.txt', `${entity},${fileInfo.path}\n`);
	}

	return null;
}
