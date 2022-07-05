interface SourceLocation {
	readonly line: number;
	readonly column: number;
}

interface Source {
	body: string;
	name: string;
	locationOffset: Location;
}

interface GraphQLErrorExtensions {
	[attributeName: string]: unknown;
}

interface GraphQLFormattedError {
	readonly message: string;
	readonly locations?: ReadonlyArray<SourceLocation>;
	readonly path?: ReadonlyArray<string | number>;
	readonly extensions?: {
		[key: string]: unknown;
	};
}

type ServerParseError = Error & {
	response: Response;
	statusCode: number;
	bodyText: string;
};

type ServerError = Error & {
	response: Response;
	result: Record<string, any>;
	statusCode: number;
};

interface GraphQLError extends Error {
	readonly locations?: ReadonlyArray<SourceLocation>;
	readonly path?: ReadonlyArray<string | number>;
	readonly nodes?: ReadonlyArray<any>; // any=ASTNode
	readonly source?: Source;
	readonly positions?: ReadonlyArray<number>;
	readonly originalError?: Error;
	readonly extensions: GraphQLErrorExtensions;
	toString: () => string;
	toJSON: () => GraphQLFormattedError;
}

export interface ApolloError extends Error {
	message: string;
	graphQLErrors: ReadonlyArray<GraphQLError>;
	clientErrors: ReadonlyArray<Error>;
	networkError: Error | ServerParseError | ServerError | null;
	extraInfo: any;
}

export function isApolloError(error: Error): error is ApolloError {
	return Array.isArray((error as ApolloError).graphQLErrors);
}
