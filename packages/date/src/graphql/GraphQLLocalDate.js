import {LocalDate} from 'js-joda';
import {GraphQLError} from 'graphql/error';
import {Kind} from 'graphql/language';
import {GraphQLScalarType} from 'graphql/type';
import isString from 'lodash/isString';
import isInteger from 'lodash/isInteger';

function toEpochDay(value) {
	if (isInteger(value)) return value;
	if (isString(value)) return LocalDate.parse(value).toEpochDay();
	if (value instanceof LocalDate) return value.toEpochDay();
	throw new GraphQLError('Not a valid LocalDate.');
}

const GraphQLLocalDate = new GraphQLScalarType({
	name: 'LocalDate',
	description: 'JS-Joda LocalDate',
	// Parses variable values (JSON => JSON)
	parseValue(value) {
		return toEpochDay(value);
	},
	// Called when the value is being sent to the client
	serialize(value) {
		if (isInteger(value)) return value;
		if (isString(value)) return parseInt(value, 10);
		throw new GraphQLError('Trying to serialize a non-primitive');
	},
	// Parses GraphQL language AST into the value. (AST => JSON)
	parseLiteral(ast) {
		if (ast.kind === Kind.INT) return ast.value;
		if (ast.kind === Kind.STRING) return LocalDate.parse(ast.value).toEpochDay();
		throw new GraphQLError(`Cannot convert literal ${ast.value} into LocalDate.`);
	},
});

export default GraphQLLocalDate;
