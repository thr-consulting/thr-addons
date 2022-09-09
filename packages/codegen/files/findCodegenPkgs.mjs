import {existsSync, readFileSync} from 'node:fs';
import {env} from 'node:process';
import {join} from 'node:path';
import debug from 'debug';

const d = debug('thx.tools.files.findCodegenPkgs');

const isDebug = env.DEBUG_MODE === '1';

const args = process.argv.slice(2);

const cmd = args[0];
const src = args[2];
const allPkgs = (args[1] || '').split('\n').map(pkg => {
	return pkg.replace(new RegExp(`/${src}$`), '');
});
const pkgPath = args[3];

const pkgs = [];

allPkgs.forEach(pkgDir => {
	const codegenYamlFile = `${pkgDir}/codegen.yml`;
	if (existsSync(codegenYamlFile)) {
		if (cmd === 'GET_CODEGEN_DIRS') {
			pkgs.push(`${pkgDir}/${src}`);
		} else if (cmd === 'GET_CODEGEN_NAMES') {
			const y = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf-8'));
			// pkgs.push(y.name);
			pkgs.push(pkgDir.replace(new RegExp(`^${pkgPath}/`), ''));
		}
	}
});

if (cmd === 'GET_CODEGEN_DIRS') {
	console.log(pkgs.join('\n'));
} else if (cmd === 'GET_CODEGEN_NAMES') {
	console.log(pkgs.join(','));
}
