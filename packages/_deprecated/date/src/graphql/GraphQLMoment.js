import moment from 'moment';
import {GraphQLError} from 'graphql/error';
import {Kind} from 'graphql/language';
import {GraphQLScalarType} from 'graphql/type';
import isString from 'lodash/isString';
import isInteger from 'lodash/isInteger';

function toMoment(value) {
	if (moment.isMoment(value)) return value;
	if (isInteger(value)) return moment(value); // Unix Timestamp (ms)
	if (isString(value)) return moment(value);
	throw new GraphQLError('Not a valid Moment.');
}

const GraphQLMoment = new GraphQLScalarType({
	name: 'Moment',
	description: 'Moment date',
	parseValue(value) {
		return toMoment(value);
	},
	serialize(value) {
		return toMoment(value);
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.STRING) return moment(ast.value);
		if (ast.kind === Kind.INT) return moment(parseInt(ast.value, 10));
		throw new GraphQLError(`Cannot convert literal ${ast.value} into Moment.`);
	},
});

export default GraphQLMoment;
