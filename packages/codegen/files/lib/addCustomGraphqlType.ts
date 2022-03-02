import type {Collection, JSCodeshift, TSPropertySignature, TSTypeAnnotation, TSTypeReference} from 'jscodeshift';

function makeTypeName(str: string) {
	const a = /^(.*)(Query|Mutation|Subscription)$/.exec(str);
	if (!a) throw new Error('Query or Mutation is named wrong');
	return `${a[1]}Type`;
}

function dig(typeAnno: TSTypeAnnotation['typeAnnotation']): TSTypeAnnotation['typeAnnotation'] {
	if (typeAnno.type === 'TSTypeReference') {
		if (typeAnno.typeName.type === 'Identifier' || typeAnno.typeName.type === 'TSQualifiedName') {
			const tp = typeAnno.typeParameters;
			if (tp && tp.type === 'TSTypeParameterInstantiation' && tp.params.length > 0) {
				return dig(tp.params[0]);
			}
		}
	}

	return typeAnno;
}

export function addCustomGraphqlType(root: Collection, j: JSCodeshift) {
	// Find the return type name
	//   Looks for something like 'useQuery<GetSomethingQuery, ...>'
	const u = root.find(j.CallExpression).filter(v => {
		if (v.node.callee.type === 'MemberExpression') {
			if (v.node.callee.property.type === 'Identifier') {
				return v.node.callee.property.name === 'useQuery' || v.node.callee.property.name === 'useMutation' || v.node.callee.property.name === 'useSubscription';
			}
		}
		return false;
	});
	if (u.length !== 1) throw new Error('One mutation, query, or subscription should exist in this file.');

	// Get the first generic parameters. ie. 'GetSomethingQuery'
	// @ts-ignore 'typeParameters' exists, but jscodeshift doesn't think so.
	const returnTypeName = u.nodes()[0].typeParameters.params[0].typeName.name;

	// Find the reference type (very dependant on how codegen creates types!)
	const t = root.find(j.ExportNamedDeclaration, {declaration: {type: 'TSTypeAliasDeclaration', id: {name: returnTypeName}}});
	if (t.length !== 1) throw new Error(`There must be a type alias declaration of: ${returnTypeName}`);

	// @ts-ignore
	const querySpecifier: TSPropertySignature = t.nodes()[0].declaration.typeAnnotation.members[0];
	if (querySpecifier.key.type !== 'Identifier') throw new Error(`Query specifier must have a name`);
	const querySpecifierName = querySpecifier.key.name; // Should be something like 'getSomething'

	const r = dig(querySpecifier.typeAnnotation?.typeAnnotation as TSTypeAnnotation);
	// console.log('-------');
	// console.log(j(r).toSource());
	// console.log('-------');
	t.insertAfter(`export type ${makeTypeName(returnTypeName)} = ${j(r).toSource()};`);
}
