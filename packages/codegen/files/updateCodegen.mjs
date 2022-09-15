import {readFileSync, writeFileSync} from 'node:fs';
import {env} from 'node:process';
import {join, relative, dirname, basename, extname} from 'node:path';
import debug from 'debug';
import {dump, load} from 'js-yaml';
import {get, set} from 'lodash-es';

const d = debug('thx.tools.files.updateCodegen');

const isDebug = env.DEBUG_MODE === '1';

const args = process.argv.slice(2);

const pkgDir = args[0];
const dirsWithCodegen = args[1].split(',');
const srcDir = args[2];
const mappedEntitiesPath = '/tmp/imp_codegen_entity_map.txt';
const graphqlTsPath = 'core/graphql.ts';

// Read entities from tmp file
const mappedEntities = readFileSync(mappedEntitiesPath, 'utf-8')
	.split('\n')
	.reduce((memo, line) => {
		const [entity, path, pkg] = line.split(',');
		if (!entity || entity === '') return memo;
		return [...memo, {entity, path, pkg}];
	}, []);

//
function makeRelativeObj(from, mapFromArr) {
	return mappedEntities.reduce((memo, v) => {

		// We are mapping from a package
		if (mapFromArr.includes(v.pkg)) {
			return {
				...memo,
				[v.entity]: `${v.pkg}#${v.entity}`,
			};
		}

		// We are mapping the entity from a local directory
		const relPath = relative(from, v.path);
		const pathWithoutExt = join(dirname(relPath), basename(relPath, extname(relPath)));
		return {
			...memo,
			[v.entity]: `${pathWithoutExt}#${v.entity}`,
		};
	}, {});
}

dirsWithCodegen.forEach(v => {
	const packagePath = join(pkgDir, v);
	const yaml = load(readFileSync(join(packagePath, 'codegen.yml'), 'utf-8'), {});

	const yamlMappersPath = ['generates', join(srcDir, graphqlTsPath), 'config', 'mappers'];
	const yamlMapEntitiesFromPath = ['generates', join(srcDir, graphqlTsPath), 'config', 'mapEntitiesFrom'];

	const yamlMapEntitiesFrom = get(yaml, yamlMapEntitiesFromPath, []);

	const yamlMappers = get(yaml, yamlMappersPath);
	if (yamlMappers) {
		const corePath = join(packagePath, srcDir, dirname(graphqlTsPath));
		const newMappers = makeRelativeObj(corePath, yamlMapEntitiesFrom);
		set(yaml, yamlMappersPath, newMappers);
		writeFileSync(
			join(packagePath, 'codegen.yml'),
			dump(yaml, {
				sortKeys: true,
			}),
		);
	}
});
