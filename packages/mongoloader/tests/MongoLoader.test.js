/* eslint-disable global-require, no-underscore-dangle */
import MongodbMemoryServer from 'mongodb-memory-server';
import {MongoClient} from 'mongodb';
import MongoLoader from '../src/MongoLoader';
import testData from './TestData';

let mongod;
let mongoConn;
let db;
let mockColl;
let ml;

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
	mongod = new MongodbMemoryServer();
	const port = await mongod.getPort();
	const dbName = await mongod.getDbName();
	mongoConn = await MongoClient.connect(`mongodb://localhost:${port}`, {
		useNewUrlParser: true,
	});
	db = await mongoConn.db(dbName);
	const coll = await db.collection('test');
	testData.forEach(v => coll.insertOne(v));

	ml = new MongoLoader(db, ctx, 'test');

	mockColl = ml._collection;
	mock(mockColl, ['find']);
});

afterAll(async () => {
	await mongoConn.close();
	mongod.stop();
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

	it('should throw an error when a key doesn\'t exist', async () => {
		expect.assertions(1);
		try {
			await ml.load('this_id_is_not_in_the_database');
		} catch (e) {
			expect(e).toMatchSnapshot();
		}
		ml.clearAll();
	});
});
