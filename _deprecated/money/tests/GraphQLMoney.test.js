import {graphql} from 'graphql';
import gql from 'graphql-tag';
import Money from 'js-money';
import {makeExecutableSchema} from 'graphql-tools';
import GraphQLMoney from '../src/graphql/GraphQLMoney';
import {makeMoney} from '../src/util';

expect.addSnapshotSerializer({
	test: v => Object.prototype.toString.call(v) === '[object Object]',
	print: v => JSON.stringify(v),
});

const typeDefs = gql`
	scalar Money
	type Query {
		money(item: Money): Money
	}
	schema {query: Query}
`;

const resolvers = {
	Money: GraphQLMoney,
	Query: {
		money: (root, {item}) => item,
	},
};
const schema = makeExecutableSchema({typeDefs, resolvers});

expect.addSnapshotSerializer({
	test: v => v instanceof Money,
	print: v => `${v.toString()}`,
});

describe('Money GraphQL', () => {
	it('should validate literal string value', async () => {
		expect(graphql(schema, '{money(item: "4.56")}')).resolves.toMatchSnapshot();
	});

	it('should validate literal float value', () => {
		expect(graphql(schema, '{money(item: 4.56)}')).resolves.toMatchSnapshot();
	});

	it('should validate literal int value', () => {
		expect(graphql(schema, '{money(item: 4)}')).resolves.toMatchSnapshot();
	});

	it('should validate variables of type Money', () => {
		const query = 'query basic($val: Money) {money(item: $val)}';
		expect(graphql(schema, query, null, null, {val: makeMoney(4.56)})).resolves.toMatchSnapshot();
	});

	it('should validate variables of type float', () => {
		const query = 'query basic($val: Money) {money(item: $val)}';
		expect(graphql(schema, query, null, null, {val: 4.56})).resolves.toMatchSnapshot();
	});

	it('should validate variables of type int', () => {
		const query = 'query basic($val: Money) {money(item: $val)}';
		expect(graphql(schema, query, null, null, {val: 4})).resolves.toMatchSnapshot();
	});

	it('should validate variables of type string', () => {
		const query = 'query basic($val: Money) {money(item: $val)}';
		expect(graphql(schema, query, null, null, {val: '4.56'})).resolves.toMatchSnapshot();
	});

	it('should fail when an invalid variable is passed', () => {
		const query = 'query basic($val: Money) {money(item: $val)}';
		expect(graphql(schema, query, null, null, {val: {something: 'else'}})).resolves.toMatchSnapshot();
	});
});
