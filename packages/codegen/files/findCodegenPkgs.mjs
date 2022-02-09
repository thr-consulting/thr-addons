import debug from 'debug';
import {existsSync} from 'node:fs';

const d = debug('thx.tools.files.mapEntities');

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
		if (cmd === 'GETSRCDIRS') {
			pkgs.push(`${pkgDir}/${src}`);
		} else if (cmd === 'GETSCOPES') {
			pkgs.push(pkgDir.replace(new RegExp(`^${pkgPath}/`), ''));
		}
	}
});

if (cmd === 'GETSRCDIRS') {
	console.log(pkgs.join('\n'));
} else if (cmd === 'GETSCOPES') {
	console.log(pkgs.join(','));
}
