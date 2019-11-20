import {GraphQLError} from 'graphql/error';
import {GraphQLScalarType} from 'graphql/type';
import {Kind} from 'graphql/language';
import {makeMoney} from '../util';

const GraphQLMoney = new GraphQLScalarType({
	name: 'Money',
	description: 'JS-Money object',
	// Parses variable values (JSON => JSON)
	parseValue(value) {
		return makeMoney(value);
	},
	// Called when the value is being sent to the client
	serialize(value) {
		return makeMoney(value);
	},
	// Parses GraphQL language AST into the value. (AST => JSON)
	parseLiteral(ast) {
		if (ast.kind === Kind.FLOAT || ast.kind === Kind.INT || ast.kind === Kind.STRING) return makeMoney(Number(ast.value));
		throw new GraphQLError(`Cannot convert literal ${ast.value} into Money.`);
	},
});

export default GraphQLMoney;
