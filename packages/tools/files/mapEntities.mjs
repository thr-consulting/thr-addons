import {parse, relative, sep} from 'path';
import {existsSync, readFileSync, writeFileSync} from 'fs';
import yaml from 'yaml';
import lodash from 'lodash';
import debug from 'debug';

const d = debug('thx.tools.codegen.mapEntities');

const {takeWhile, compact, groupBy} = lodash;
const args = process.argv.slice(2);

const pkgPath = args[0];
const src = args[1];

d(`Packages folder: ${pkgPath}`);
d(`Src folder: ${src}`);

const entityMap = readFileSync('/tmp/imp_codegen_entity_map.txt', 'utf-8');
const lines = entityMap.split('\n');

const mapped = groupBy(
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

Object.keys(mapped).forEach(pkg => {
	d(`Entities found in ${pkg} package`);
	const codegenYamlFile = `${pkgPath}/${pkg}/codegen.yml`;
	if (existsSync(codegenYamlFile)) {
		const yam = readFileSync(codegenYamlFile, 'utf-8');
		const obj = yaml.parse(yam);

		const graphqltsFile = `${src}/core/graphql.ts`;
		if (!lodash.get(obj, ['generates', graphqltsFile, 'config'])) {
			console.log(`[ERROR] Codegen yaml doesn't have config section: generates.${graphqltsFile}.config: ${codegenYamlFile}`);
			process.exit(1);
		}

		obj.generates[graphqltsFile].config.mappers = mapped[pkg].reduce((memo, m) => {
			const parsed = parse(m.entityPath);
			return {
				...memo,
				[m.entity]: `${parsed.dir}${sep}${parsed.name}#${m.entity}`,
			};
		}, {});
		d(`Writing codegen yaml file: ${codegenYamlFile}`);
		writeFileSync(codegenYamlFile, yaml.stringify(obj, {sortMapEntries: true}));
	} else {
		console.log(`[ERROR] Cannot find codegen yaml file: ${codegenYamlFile}`);
		process.exit(1);
	}
});
