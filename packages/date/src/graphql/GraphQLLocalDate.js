import {LocalDate} from 'js-joda';
import {GraphQLError} from 'graphql/error';
import {Kind} from 'graphql/language';
import {GraphQLScalarType} from 'graphql';
import isString from 'lodash/isString';
import isInteger from 'lodash/isInteger';

function toLocalDate(value) {
	if (value instanceof LocalDate) return value;
	if (isInteger(value)) return LocalDate.ofEpochDay(value);
	if (isString(value)) return LocalDate.parse(value);
	throw new GraphQLError('Not a valid LocalDate.');
}

const GraphQLLocalDate = new GraphQLScalarType({
	name: 'LocalDate',
	description: 'JS-Joda LocalDate',
	parseValue(value) {
		return toLocalDate(value);
	},
	serialize(value) {
		return toLocalDate(value);
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.STRING) return LocalDate.parse(ast.value);
		if (ast.kind === Kind.INT) return LocalDate.ofEpochDay(parseInt(ast.value, 10));
		throw new GraphQLError(`Cannot convert literal ${ast.value} into LocalDate.`);
	},
});

export default GraphQLLocalDate;
