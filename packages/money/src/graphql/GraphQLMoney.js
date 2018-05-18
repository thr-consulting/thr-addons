import {GraphQLError} from 'graphql/error';
import {GraphQLScalarType} from 'graphql';
import {Kind} from 'graphql/language';
import isString from 'lodash/isString';
import Money from 'js-money';
import {makeMoney} from '../util';

expect.addSnapshotSerializer({
	test: v => Object.prototype.toString.call(v) === '[object Object]',
	print: v => JSON.stringify(v),
});

const GraphQLMoney = new GraphQLScalarType({
	name: 'Money',
	description: 'JS-Money object',
	// Parses variable values (JSON => JSON)
	parseValue(value) {
		if (isString(value)) return makeMoney(Number(value));
		return makeMoney(value);
	},
	// Called when the value is being sent to the client
	serialize(value) {
		if (value instanceof Money) return value;
		throw new GraphQLError('Trying to serialize a non-primitive');
	},
	// Parses GraphQL language AST into the value. (AST => JSON)
	parseLiteral(ast) {
		if (ast.kind === Kind.FLOAT || ast.kind === Kind.INT || ast.kind === Kind.STRING) return makeMoney(Number(ast.value));
		throw new GraphQLError(`Cannot convert literal ${ast.value} into Money.`);
	},
});

export default GraphQLMoney;
