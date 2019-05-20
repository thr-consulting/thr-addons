import React from 'react';
import {graphql, compose} from 'react-apollo';
// import debug from 'debug';

// const d = debug('app:Mutations');

export default function Graphql(mutationProps) {
	const {mutations, queries, render} = mutationProps;

	const composedMutationFuncs = compose(...Object.keys(mutations).map(v => {
		const {mutation, options} = mutations[v];
		return graphql(mutation, {
			name: v,
			alias: v,
			options,
		});
	}));

	const composedQueryFuncs = compose(...Object.keys(queries).map(v => {
		const {query, options} = queries[v];
		return graphql(query, {
			name: v,
			alias: v,
			options,
		});
	}));

	const SubCompInstance = compose(composedQueryFuncs, composedMutationFuncs)(subCompProps => {
		const mutates = subCompProps.mutationNames.reduce((memo, mutationName) => ({
			...memo,
			[mutationName]: subCompProps[mutationName],
		}), {});

		const data = subCompProps.queryNames.reduce((memo, queryName) => ({
			...memo,
			[queryName]: subCompProps[queryName],
		}), {});

		const loading = subCompProps.queryNames.reduce((memo, queryName) => memo || subCompProps[queryName].loading, false);

		return subCompProps.render(mutates, data, {loading});
	});

	return <SubCompInstance render={render} mutationNames={Object.keys(mutations)} queryNames={Object.keys(queries)}/>;
}
