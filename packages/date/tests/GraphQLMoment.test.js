import {graphql} from 'graphql';
import gql from 'graphql-tag';
import moment from 'moment';
import {makeExecutableSchema} from 'graphql-tools';
import GraphQLMoment from '../src/graphql/GraphQLMoment';

const typeDefs = gql`
  scalar Moment
  type Query {
    moment(item: Moment): Moment
  }
  schema {query: Query}
`;
const resolvers = {
	Moment: GraphQLMoment,
	Query: {
		moment: (root, {item}) => item,
	},
};
const schema = makeExecutableSchema({typeDefs, resolvers});

expect.addSnapshotSerializer({
	test: v => moment.isMoment(v),
	print: v => v.toISOString(),
});

describe('Moment GraphQL', () => {
	it('should validate literal values', async () => {
		expect(graphql(schema, '{moment(item: "2017-01-01 24:00:00.000")}')).resolves.toMatchSnapshot();
		expect(graphql(schema, '{moment(item: 1716)}')).resolves.toMatchSnapshot();
	});

	it('should validate variable values', () => {
		const query = 'query basic($val: Moment) {moment(item: $val)}';
		expect(graphql(schema, query, null, null, {val: moment(17384)})).resolves.toMatchSnapshot();
		expect(graphql(schema, query, null, null, {val: 42})).resolves.toMatchSnapshot();
		expect(graphql(schema, query, null, null, {val: '2017-01-01 24:00:00.000'})).resolves.toMatchSnapshot();
	});
});
