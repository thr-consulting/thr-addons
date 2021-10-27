import {parse, relative, sep} from 'path';
import {existsSync, readFileSync, writeFileSync, readdirSync} from 'fs';
import yaml from 'yaml';
import lodash from 'lodash';
import debug from 'debug';

const d = debug('thx.tools.codegen.mapEntities');

/*
	Adds the following config options to codegen.yml

	generates:
	  {generatedfile.ts}
	    config:
	      mapEntitiesFrom:
	        {pkgDir}: boolean | string    - If true, imports from local file, otherwise imports from package.
*/

const {takeWhile, compact, groupBy} = lodash;
const args = process.argv.slice(2);

const pkgPath = args[0];
const src = args[1];
const tmpEntitiesFile = '/tmp/imp_codegen_entity_map.txt';

d(`Packages folder: ${pkgPath}`);
d(`Src folder: ${src}`);

/**
 * Returns an object with pkgDir keys, each being an array of {entity (name of Entity), entityPath (full path to entity file), pkg (pkg dir)} objects.
 * @returns {*}
 */
function readMappedEntities() {
	const entityMap = readFileSync(tmpEntitiesFile, 'utf-8');
	const lines = entityMap.split('\n');
	return groupBy(
		compact(
			lines.map(line => {
				if (!line) return null;
				const tuple = line.split(',');
				const relArr = relative(pkgPath, tuple[1]).split(sep);
				const pkg = takeWhile(relArr, v => v !== src).join(sep);
				return {
					entity: tuple[0],
					entityPath: relative(`${pkgPath}${sep}${pkg}${sep}${src}${sep}core`, tuple[1]),
					pkg,
				};
			}),
		),
		'pkg',
	);
}

const mappedEntities = readMappedEntities();
if (Object.keys(mappedEntities).length === 0) process.exit(0);

function mapEntitiesFromPackage(config) {
	Object.keys(mappedEntities).forEach(entityPkgDir => {
		mappedEntities[entityPkgDir].forEach(entityMap => {
			config.mappers[entityMap.entity] = `${config.mapEntitiesFromPackage[entityPkgDir]}#${entityMap.entity}`;
		});
	});
}

function mapEntitiesFrom(config) {
	Object.keys(mappedEntities).forEach(entityPkgDir => {
		mappedEntities[entityPkgDir].forEach(entityMap => {
			if (typeof config.mapEntitiesFrom[entityPkgDir] === 'boolean' && config.mapEntitiesFrom[entityPkgDir]) {
				// Map to local file (within package)
				const parsed = parse(entityMap.entityPath);
				config.mappers[entityMap.entity] = `${parsed.dir}${sep}${parsed.name}#${entityMap.entity}`;
			} else if (typeof config.mapEntitiesFrom[entityPkgDir] === 'string') {
				// Map to imported package specified
				config.mappers[entityMap.entity] = `${config.mapEntitiesFrom[entityPkgDir]}#${entityMap.entity}`;
			}
		});
	});
}

const pkgDirs = readdirSync(pkgPath);
pkgDirs.forEach(pkgDir => {
	const codegenYamlFile = `${pkgPath}/${pkgDir}/codegen.yml`;
	if (existsSync(codegenYamlFile)) {
		const yam = readFileSync(codegenYamlFile, 'utf-8');
		const codegenConfig = yaml.parse(yam);

		if (!codegenConfig.generates) return;
		Object.keys(codegenConfig.generates).forEach(generatesKey => {
			if (!codegenConfig.generates[generatesKey].config) return;

			if (codegenConfig.generates[generatesKey].config.mapEntitiesFrom) {
				mapEntitiesFrom(codegenConfig.generates[generatesKey].config);
			}
		});

		const configOut = yaml.stringify(codegenConfig, {sortMapEntries: true});
		writeFileSync(codegenYamlFile, configOut);
	}
});
