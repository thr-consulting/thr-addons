import {uniq} from 'lodash-es';
import {isApolloError} from './graphqlErrorTypes';

export interface ErrorMessages {
	title?: string;
	errors: string[];
}

export function errorMessages(error: any): ErrorMessages | null {
	let errors: string[] = [];
	let title = 'Error';

	if (typeof error === 'string') {
		errors.push(error);
	} else if (Array.isArray(error)) {
		errors.concat(error);
	} else if (error instanceof Error) {
		if (isApolloError(error)) {
			errors = error.graphQLErrors.reduce((memo, v) => {
				if (v.message) return [...memo, v.message];
				return memo;
			}, [] as string[]);

			const colonIndex = error.message.indexOf(': ');
			if (colonIndex >= 0) {
				title = error.message.slice(0, error.message.indexOf(': '));
			} else {
				title = error.message;
			}
		} else {
			const errorMessage = error.message.slice(error.message.indexOf(': ') + 1);
			errors.push(errorMessage);
		}
	}
	errors = uniq(errors);

	if (errors.length === 0) return null;

	return {
		title,
		errors,
	};
}
