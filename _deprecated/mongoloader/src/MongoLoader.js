/* eslint-disable lines-between-class-members */
import debug from 'debug';
import DataLoader from 'dataloader';
import isArray from 'lodash/isArray';
import get from 'lodash/get';

const d = debug('thx:mongoloader:MongoLoader');

/**
 * Extend this class to give DataLoader caching and batching power to your Mongo collection.
 * When creating loaders on properties, make sure each property is indexed for performance reasons.
 */
export default class MongoLoader {
	constructor(db, ctx, collectionName, options) {
		// Protected members
		this.ctx = ctx;

		// Private members
		this._collectionName = collectionName;
		this._collection = db.collection(collectionName);
		this._dataloaders = {};

		// Create default loader which loads by _id
		this.createLoader('_id', options);
	}

	/**
	 * Returns the contexts models. Shortcut for this.ctx.models.
	 * @return {{testModel: string}|ctx._models|{testModel}}
	 */
	get models() {
		return this.ctx._models; /* eslint-disable-line no-underscore-dangle */
	}

	/**
	 * Ensure the order of batch loaded objects
	 * Written by lukejagodzinski: https://github.com/facebook/dataloader/issues/66#issuecomment-386252044
	 * @param docs
	 * @param keys
	 * @param prop
	 * @param error Function that takes a key and should return an error string
	 */
	static ensureOrder({docs, keys, prop, error}) {
		// Put documents (docs) into a map where key is a document's ID or some
		// property (prop) of a document and value is a document.
		const docsMap = new Map();
		docs.forEach(doc => docsMap.set(get(doc, prop), doc));

		return keys.map(key => docsMap.get(key) || error(key));

		// Loop through the keys and for each one retrieve proper document. For not
		// existing documents generate an error.
		// return keys.map(key => docsMap.get(key) || new Error(error(key)));
	}

	/**
	 * Return a function that finds Mongo records based off of a certain key. Ensures correct order and primes the
	 * other dataloaders as well.
	 * @param key The dataloader key which corresponds to the document property
	 * @param errorFunc
	 * @returns {function(*=)}
	 * @private
	 */
	_findBy = (key, errorFunc = () => undefined) => async keys => {
		d(`Fetching from ${this._collectionName}: ${keys}`);

		const docsI = await this._collection.find({[key]: {$in: keys}}).toArray();

		// Fetch the documents from Mongo and ensure the same order as keys
		const docs = MongoLoader.ensureOrder({
			docs: docsI,
			keys,
			prop: key,
			error: errorFunc,
		});

		// For each other dataloader, prime with returned documents
		Object.keys(this._dataloaders).forEach(dataloader => {
			if (key === dataloader) return; // Don't prime current dataloader
			docs.forEach(doc => {
				if (doc && !(doc instanceof Error)) this._dataloaders[dataloader].prime(doc[dataloader], doc);
			});
		});

		return docs;
	};

	/**
	 * Creates a new dataloader which loads on a specific document property
	 * @param key The document key
	 * @param options Dataloader options
	 */
	createLoader = (key, options) => {
		this._dataloaders[key] = new DataLoader(this._findBy(key, options ? options.errorFunc : undefined), options);
	};

	/**
	 * Loads a single document by specific property from a dataloader.
	 * @param key The key value
	 * @param dataloader Document property to load from
	 */
	load = (key, dataloader = '_id') => this._dataloaders[dataloader].load(key);

	/**
	 * Loads multiple documents by a specific property from a dataloader.
	 * @param keys The key value array
	 * @param dataloader Document property to load from
	 * @returns {*}
	 */
	loadMany = (keys, dataloader = '_id') => this._dataloaders[dataloader].loadMany(keys);

	/**
	 * Clears a single document from all dataloaders.
	 * @param doc
	 */
	clear = doc => {
		Object.keys(this._dataloaders).forEach(dataloader => {
			this._dataloaders[dataloader].clear(doc[dataloader]);
		});
	};

	/**
	 * Clears all documents from all dataloaders.
	 */
	clearAll = () => {
		Object.keys(this._dataloaders).forEach(dataloader => {
			this._dataloaders[dataloader].clearAll();
		});
	};

	/**
	 * Prime all dataloaders with a document or documents. Returns the document for convenience.
	 * @param doc Either a single document or an array of documents.
	 * @return {*}
	 */
	prime = doc => {
		if (doc) {
			Object.keys(this._dataloaders).forEach(dataloader => {
				if (isArray(doc)) {
					doc.forEach(oneDoc => this._dataloaders[dataloader].prime(get(oneDoc, dataloader), oneDoc));
				} else {
					this._dataloaders[dataloader].prime(get(doc, dataloader), doc);
				}
			});
		}
		return doc;
	};

	// Direct Mongo methods. These bypass the dataloader (no caching or batching).
	count = (query, options) => this._collection.count(query, options);
	createIndex = (fieldOrSpec, options) => this._collection.createIndex(fieldOrSpec, options);
	createIndexes = (indexSpecs, options) => this._collection.createIndexes(indexSpecs, options);
	deleteMany = (filter, options) => this._collection.deleteMany(filter, options);
	deleteOne = (filter, options) => this._collection.deleteOne(filter, options);
	distinct = (key, query, options) => this._collection.distinct(key, query, options);
	drop = options => this._collection.drop(options);
	find = (query, options) => this._collection.find(query, options);
	findOne = (query, options) => this._collection.findOne(query, options);
	findOneAndDelete = (query, options) => this._collection.findOneAndDelete(query, options);
	findOneAndReplace = (query, replacement, options) => this._collection.findOneAndReplace(query, replacement, options);
	findOneAndUpdate = (query, update, options) => this._collection.findOneAndUpdate(query, update, options);
	insertMany = (docs, options) => this._collection.insertMany(docs, options);
	insertOne = (doc, options) => this._collection.insertOne(doc, options);
	replaceOne = (query, doc, options) => this._collection.replaceOne(query, doc, options);
	updateMany = (query, update, options) => this._collection.updateMany(query, update, options);
	updateOne = (query, update, options) => this._collection.update(query, update, options);
}
