import {GraphQLError} from 'graphql/error';
import {GraphQLScalarType} from 'graphql';
import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import {makeMoney} from '@thx/money/server';

const GraphQLMoney = new GraphQLScalarType({
	name: 'MoneyObj',
	description: 'MoneyObj',
	// Parses variable values (JSON => JSON)
	parseValue(value) {
		if (isEmpty(value) || !isObject(value)) return makeMoney({amount: 0, currency: 'CAD'});
		return makeMoney(value);
	},
	// Called when the value is being sent to the client
	serialize(value) {
		if (isEmpty(value) || !isObject(value)) return makeMoney({amount: 0, currency: 'CAD'});
		if (isObject(value)) return makeMoney(value);
		throw new GraphQLError('Trying to serialize a non-primitive');
	},
	// Parses GraphQL language AST into the value. (AST => JSON)
	parseLiteral(ast) {
		if (isEmpty(ast.value) || !isObject(ast.value)) return makeMoney({amount: 0, currency: 'CAD'});
		return makeMoney(ast.value);
	},
});

export default GraphQLMoney;
