#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const semver = require('semver');

const updates = _.drop(process.argv, 2).map(v => {
	const p = v.split('@');
	return {
		name: p[0],
		version: p[1],
	};
});

const pj = fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8');
if (pj) {
	const pjj = JSON.parse(pj);
	const deps = pjj.dependencies;
	const devDeps = pjj.devDependencies;
	const peerDeps = pjj.peerDependencies;

	updates.forEach(v => {
		if (deps && deps[v.name]) {
			deps[v.name] = `^${v.version}`;
		}
		if (devDeps && devDeps[v.name]) {
			devDeps[v.name] = `^${v.version}`;
		}
		if (peerDeps && peerDeps[v.name]) {
			peerDeps[v.name] = `^${semver.major(v.version)}.${semver.minor(v.version)}.0`;
		}
	});

	if (pjj.dependencies) pjj.dependencies = deps;
	if (pjj.devDependencies) pjj.devDependencies = devDeps;
	if (pjj.peerDependencies) pjj.peerDependencies = peerDeps;

	fs.writeFileSync(path.resolve(process.cwd(), 'package.json'), `${JSON.stringify(pjj, null, '  ')}\n`, 'utf8');
}
