import type {Collection} from 'jscodeshift';
import type {JSCodeshift} from 'jscodeshift/src/core';

export function addTypescriptUtilityTypes(root: Collection, j: JSCodeshift) {
	const unarray = root.find(j.TSTypeAliasDeclaration, {id: {name: 'UnArray'}});
	if (unarray.length === 0) {
		root
			.find(j.ExportNamedDeclaration, {declaration: {id: {name: 'MakeMaybe'}}})
			.insertAfter('export type ExtractArray<A> = NonNullable<UnArray<NonNullable<A>>>;')
			.insertAfter('export type UnArray<T> = T extends Array<infer U> ? U : T;')
			.insertAfter('export type NotMaybe<T> = T extends null | undefined ? never : T;');
	}
}
