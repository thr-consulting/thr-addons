import type {Collection, JSCodeshift, TSPropertySignature, TSTypeAnnotation, TSTypeReference} from 'jscodeshift';
import type { TSTypeKind } from 'ast-types/gen/kinds';

function makeTypeName(str: string) {
	const a = /^(.*)(Query|Mutation|Subscription)$/.exec(str);
	if (!a) throw new Error('Query or Mutation is named wrong');
	return `${a[1]}Type`;
}

function isolateArrayType(v: TSTypeKind | undefined) {
	if (!v) {
		throw new Error('Null arrayType');
	}
	if (v?.type === 'TSUnionType') {
		return v.types[0];
	}
	return v;
}

/**
 * Isolates a graphql return type to it's "atomic" type. Removes optionals and possibly digs into first array type.
 * @param typeAnno
 */
function isolateGraphqlReturnType(typeAnno: TSTypeAnnotation['typeAnnotation']): TSTypeAnnotation['typeAnnotation'] {
	if (typeAnno.type === 'TSUnionType') {
		if (typeAnno.types.length !== 2) {
			throw new Error(`We expect union types to be between 2 different types but received: ${typeAnno.types.length}`);
		}
		if (typeAnno.types[1].type !== 'TSNullKeyword') {
			throw new Error(`We expect union types to be between the first type and a null but we received: ${typeAnno.types[1].type}`);
		}

		const firstUnionMember = typeAnno.types[0];
		if (firstUnionMember.type === 'TSTypeReference' && firstUnionMember.typeName.type === 'Identifier' && firstUnionMember.typeName.name === 'Array') {
			return isolateArrayType(firstUnionMember.typeParameters?.params[0]);
		}
		return firstUnionMember;
	}

	if (typeAnno.type === 'TSTypeReference' && typeAnno.typeName.type === 'Identifier' && typeAnno.typeName.name === 'Array') {
		return isolateArrayType(typeAnno.typeParameters?.params[0]);
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
	// const querySpecifierName = querySpecifier.key.name; // Should be something like 'getSomething'

	const r = isolateGraphqlReturnType(querySpecifier.typeAnnotation?.typeAnnotation as TSTypeAnnotation);
	// console.log('-------');
	// console.log(j(r).toSource());
	// console.log('-------');
	t.insertAfter(`export type ${makeTypeName(returnTypeName)} = ${j(r).toSource()};`);
}
