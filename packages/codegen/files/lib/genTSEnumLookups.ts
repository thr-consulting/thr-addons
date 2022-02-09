import type {Collection, JSCodeshift} from 'jscodeshift';

interface EnumMember {
	memberName: string;
	memberValue: string;
}

function createCase(enumMember: EnumMember, enumName: string) {
	return `		case '${enumMember.memberValue}': return ${enumName}.${enumMember.memberName};`;
}

function lowerCaseFirstLetter(s: string) {
	return s.charAt(0).toLowerCase() + s.slice(1);
}

export function genTSEnumLookups(root: Collection, j: JSCodeshift) {
	const functionsCode: string[] = [];
	root.find(j.TSEnumDeclaration).forEach(v => {
		const enumName = v.node.id.name;
		const {members} = v.node;

		const enumMembers: EnumMember[] = [];
		members.forEach(member => {
			if (member.id.type === 'Identifier' && member.initializer?.type === 'StringLiteral') {
				const memberName = member.id.name;
				const memberValue = member.initializer.value;
				enumMembers.push({
					memberName,
					memberValue,
				});
			}
		});

		functionsCode.push(`
export function ${lowerCaseFirstLetter(enumName)}Lookup(value: string) {
	switch (value) {
${enumMembers.map(x => createCase(x, enumName)).join('\n')}
		default: throw new Error('Cannot find enum value: ${enumName}');
	}
}
`);
	});

	root.get().node.program.body.push(functionsCode.join(''));
}
