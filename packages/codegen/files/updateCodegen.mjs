import {readFileSync} from 'node:fs';
import {env} from 'node:process';
import {join, relative, dirname} from 'node:path';
import debug from 'debug';
import {dump, load} from 'js-yaml';
import {get, set} from 'lodash-es';
import {writeFileSync} from 'fs';

const d = debug('thx.tools.files.updateCodegen');

const isDebug = env.DEBUG_MODE === '1';

const args = process.argv.slice(2);

const pkgDir = args[0];
const dirsWithCodegen = args[1].split(',');
const srcDir = args[2];
const mappedEntitiesPath = '/tmp/imp_codegen_entity_map.txt';
const graphqlTsPath = 'core/graphql.ts';

const mappedEntities = readFileSync(mappedEntitiesPath, 'utf-8')
	.split('\n')
	.reduce((memo, line) => {
		const [entity, path] = line.split(',');
		if (!entity || entity === '') return memo;
		return [...memo, {entity, path}];
	}, []);

function makeRelativeObj(from) {
	return mappedEntities.reduce((memo, v) => {
		return {
			...memo,
			[v.entity]: `${relative(from, v.path)}#${v.entity}`,
		};
	}, {});
}

dirsWithCodegen.forEach(v => {
	const packagePath = join(pkgDir, v);
	const yaml = load(readFileSync(join(packagePath, 'codegen.yml'), 'utf-8'));

	const mappersYamlPath = ['generates', join(srcDir, graphqlTsPath), 'config', 'mappers'];

	const a = get(yaml, mappersYamlPath);
	if (a) {
		const corePath = join(packagePath, srcDir, dirname(graphqlTsPath));
		const newMappers = makeRelativeObj(corePath);
		set(yaml, mappersYamlPath, newMappers);
		writeFileSync(
			join(packagePath, 'codegen.yml'),
			dump(yaml, {
				sortKeys: true,
			}),
		);
	}
});
