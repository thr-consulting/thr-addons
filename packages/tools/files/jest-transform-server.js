const fs = require('fs');
const path = require('path');
const {getTsconfigAliasPaths} = require('@thx/common-webpack');
const transformer = require('babel-jest');

let aliasPaths = {};
if (fs.existsSync(path.join(process.cwd(), 'tsconfig.json'))) {
	const tsconfig = require(path.join(process.cwd(), 'tsconfig.json'));
	aliasPaths = getTsconfigAliasPaths(tsconfig, []);
}

module.exports = transformer.default.createTransformer({
	presets: [['@imperium/babel-preset-imperium', {client: false, typescript: true, alias: aliasPaths}]],
});
