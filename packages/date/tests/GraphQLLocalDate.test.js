import {graphql} from 'graphql';
import gql from 'graphql-tag';
import {LocalDate} from 'js-joda';
import {makeExecutableSchema} from 'graphql-tools';
import GraphQLLocalDate from '../src/graphql/GraphQLLocalDate';

const typeDefs = gql`
  scalar LocalDate
  type Query {
    localDate(item: LocalDate): LocalDate
  }
  schema {query: Query}
`;
const resolvers = {
	LocalDate: GraphQLLocalDate,
	Query: {
		localDate: (root, {item}) => item,
	},
};
const schema = makeExecutableSchema({typeDefs, resolvers});

expect.addSnapshotSerializer({
	test: v => v instanceof LocalDate,
	print: v => `${v.toEpochDay().toString()} ${v.toString()}`,
});

describe('LocalDate GraphQL', () => {
	it('should validate literal values', async () => {
		expect(graphql(schema, '{localDate(item: "2017-01-01")}')).resolves.toMatchSnapshot();
		expect(graphql(schema, '{localDate(item: 1716)}')).resolves.toMatchSnapshot();
	});

	it('should validate variable values', () => {
		const query = 'query basic($val: LocalDate) {localDate(item: $val)}';
		expect(graphql(schema, query, null, null, {val: LocalDate.ofEpochDay(42)})).resolves.toMatchSnapshot();
		expect(graphql(schema, query, null, null, {val: 42})).resolves.toMatchSnapshot();
		expect(graphql(schema, query, null, null, {val: '2017-01-01'})).resolves.toMatchSnapshot();
	});
});
