import {LocalDate} from 'js-joda';
import {GraphQLError} from 'graphql/error';
import {Kind} from 'graphql/language';
import {GraphQLScalarType} from 'graphql/type';
import isString from 'lodash/isString';
import isInteger from 'lodash/isInteger';
import debug from 'debug';
import {transformObjectsToLocalDates} from '../util';

const d = debug('thx.date.graphQLLocalDate');

const GraphQLLocalDate = new GraphQLScalarType({
	name: 'LocalDate',
	description: 'JS-Joda LocalDate',
	// Parses variable values (JSON => JSON) (value from client)
	parseValue(value) {
		if (isInteger(value)) return LocalDate.ofEpochDay(value);
		if (isString(value)) return LocalDate.parse(value);
		if (value instanceof LocalDate) return value;
		if (value instanceof Object) return transformObjectsToLocalDates(value);
		throw new GraphQLError('Trying to parse a non-LocalDate');
	},
	// Called when the value is being sent to the client (value sent to the client)
	serialize(value) {
		if (isInteger(value)) return value;
		if (isString(value)) return LocalDate.parse(value).toEpochDay();
		if (value instanceof LocalDate) return value.toEpochDay();
		if (value instanceof Object) return transformObjectsToLocalDates(value).toEpochDay();
		throw new GraphQLError('Trying to serialize a non-primitive');
	},
	// Parses GraphQL language AST into the value. (AST => JSON)
	parseLiteral(ast) {
		if (ast.kind === Kind.INT) return LocalDate.ofEpochDay(parseInt(ast.value, 10));
		if (ast.kind === Kind.STRING) return LocalDate.parse(ast.value);
		throw new GraphQLError(`Cannot convert literal ${ast.value} into LocalDate.`);
	},
});

export default GraphQLLocalDate;
