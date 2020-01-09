import debug from 'debug';
import DataLoader from 'dataloader';
import {Model, Document, Types} from 'mongoose';

const d = debug('thx.extras.createDataLoader');

export default function createDataLoader(model: Model<Document>): () => DataLoader<string | Types.ObjectId, Document> {
	return () => new DataLoader(async keys => {
		d(`${model.modelName} Finding:`, keys);
		const docs = await model.find({_id: {$in: keys}});
		const docsMap = new Map();
		docs.forEach(doc => docsMap.set(doc._id.toString(), doc));
		return keys.map(key => docsMap.get(key.toString()) || undefined);
	});
}
