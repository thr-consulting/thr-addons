/* eslint-disable global-require, no-underscore-dangle */
import MongoLoader from '../src/MongoLoader';
import testData from './TestData';
import {mongoSetup, mongoTeardown} from './mongo';

jest.setTimeout(60000);

let mongo;
let mockColl;
let ml;
let mlWithErrors;

// Context
const ctx = {
	_models: {testModel: 'testModel'},
};

function mock(obj, fns) {
	fns.forEach(v => {
		obj[v] = jest.fn(obj[v]); // eslint-disable-line no-param-reassign
	});
}

beforeAll(async () => {
	mongo = await mongoSetup();

	const coll = await mongo.db.collection('test');
	testData.forEach(v => coll.insertOne(v));

	ml = new MongoLoader(mongo.db, ctx, 'test');

	mlWithErrors = new MongoLoader(mongo.db, ctx, 'test', {
		errorFunc: id => new Error(`Document not found: ${id}`),
	});

	mockColl = ml._collection;
	mock(mockColl, ['find']);
});

afterAll(async () => {
	await mongoTeardown(mongo);
});

describe('MongoLoader', () => {
	it('should construct properly', async () => {
		expect(ml.ctx).toBe(ctx);
		expect(ml.models.testModel).toBe(ctx._models.testModel);
	});

	it('should load data by _id (default loader)', async () => {
		const a = await ml.load('a304d4c6-12c4-4d80-b2b7-5fa8dcc3df5d');
		expect(a.name).toBe('Rebekah Krause');
		expect(mockColl.find.mock.calls).toHaveLength(1);
	});

	it('should have cached the previous load', async () => {
		const a = await ml.load('a304d4c6-12c4-4d80-b2b7-5fa8dcc3df5d');
		expect(a.name).toBe('Rebekah Krause');
		expect(mockColl.find.mock.calls).toHaveLength(1);
		ml.clearAll();
	});

	it('should batch load individual calls', async () => {
		const [a, b] = await Promise.all([
			ml.load('a304d4c6-12c4-4d80-b2b7-5fa8dcc3df5d'),
			ml.load('1293cac1-4551-45f2-8798-cb2e75950f7a'),
		]);
		expect(a.name).toBe('Rebekah Krause');
		expect(b.name).toBe('Norman Wilkerson');
		expect(mockColl.find.mock.calls).toHaveLength(2);
		ml.clearAll();
	});

	it('should batch load many calls', async () => {
		const [a, b] = await ml.loadMany(['a304d4c6-12c4-4d80-b2b7-5fa8dcc3df5d', '1293cac1-4551-45f2-8798-cb2e75950f7a']);
		expect(a.name).toBe('Rebekah Krause');
		expect(b.name).toBe('Norman Wilkerson');
		expect(mockColl.find.mock.calls).toHaveLength(3);
		ml.clearAll();
	});

	it('should load other keys', async () => {
		ml.createLoader('name');
		const a = await ml.load('Rebekah Krause', 'name');
		expect(a._id).toBe('a304d4c6-12c4-4d80-b2b7-5fa8dcc3df5d');
		expect(mockColl.find.mock.calls).toHaveLength(4);
		ml.clearAll();
	});

	it('should cache read a primed document', async () => {
		ml.prime(testData[0]);
		const a = await ml.load('a304d4c6-12c4-4d80-b2b7-5fa8dcc3df5d');
		expect(a.name).toBe('Rebekah Krause');
		expect(mockColl.find.mock.calls).toHaveLength(4);
		ml.clearAll();
	});

	it('should cache read primed documents', async () => {
		ml.prime(testData);
		const [a, b] = await ml.loadMany(['a304d4c6-12c4-4d80-b2b7-5fa8dcc3df5d', '1293cac1-4551-45f2-8798-cb2e75950f7a']);
		expect(a.name).toBe('Rebekah Krause');
		expect(b.name).toBe('Norman Wilkerson');
		expect(mockColl.find.mock.calls).toHaveLength(4);
		ml.clearAll();
	});

	it('should load sub keys', async () => {
		ml.createLoader('profile.accessCode');
		const a = await ml.load('abcdefghijklmnopqrstuvwxyz', 'profile.accessCode');
		expect(a._id).toBe('a304d4c6-12c4-4d80-b2b7-5fa8dcc3df5d');
		expect(mockColl.find.mock.calls).toHaveLength(5);
		ml.clearAll();
	});

	it('should prime a sub key', async () => {
		ml.prime(testData[0]);
		const a = await ml.load('abcdefghijklmnopqrstuvwxyz', 'profile.accessCode');
		expect(a.name).toBe('Rebekah Krause');
		expect(mockColl.find.mock.calls).toHaveLength(5);
		ml.clearAll();
	});

	it('should clear a document', async () => {
		const a = await ml.load('a304d4c6-12c4-4d80-b2b7-5fa8dcc3df5d');
		expect(a.name).toBe('Rebekah Krause');
		expect(mockColl.find.mock.calls).toHaveLength(6);
		ml.clear(a);
		const b = await ml.load('a304d4c6-12c4-4d80-b2b7-5fa8dcc3df5d');
		expect(b.name).toBe('Rebekah Krause');
		expect(mockColl.find.mock.calls).toHaveLength(7);
		ml.clearAll();
	});

	it('should return undefined when a key doesn\'t exist', async () => {
		const doc = await ml.load('this_id_is_not_in_the_database');
		expect(doc).toBeUndefined();
		ml.clearAll();
	});

	it('should return undefined for keys that don\'t exist', async () => {
		const [a, b] = await ml.loadMany(['this_id_is_not_in_the_database', 'a304d4c6-12c4-4d80-b2b7-5fa8dcc3df5d']);
		expect(a).toBeUndefined();
		expect(b).toMatchSnapshot();
		ml.clearAll();
	});

	it('should throw an error when a key doesn\'t exist, if configured to', async () => {
		expect.assertions(1);
		try {
			await mlWithErrors.load('this_id_is_not_in_the_database');
		} catch (e) {
			expect(e).toMatchSnapshot();
		}
		mlWithErrors.clearAll();
	});

	it('should throw an error when some keys don\'t exist, if configured to', async () => {
		expect.assertions(1);
		try {
			await mlWithErrors.loadMany(['this_id_is_not_in_the_database', 'a304d4c6-12c4-4d80-b2b7-5fa8dcc3df5d']);
		} catch (e) {
			expect(e).toMatchSnapshot();
		}
		mlWithErrors.clearAll();
	});
});
