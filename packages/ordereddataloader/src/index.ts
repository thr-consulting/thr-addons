import debug from 'debug';
import get from 'lodash/get';
import identity from 'lodash/identity';
import DataLoader from 'dataloader';

const d = debug('app.lib.OrderedDataLoader');

interface OrderedDataLoaderOptions<K, V, C = K> extends DataLoader.Options<K, V, C> {
	idField?: string;
}

export default class OrderedDataLoader<K, V, C = K> {
	private dataloader: DataLoader<K, V | undefined, C>;
	private readonly batchLoadFn: DataLoader.BatchLoadFn<K, V>;
	private options: OrderedDataLoaderOptions<K, V, C>;

	constructor(findByIds: DataLoader.BatchLoadFn<K, V>, orderedDataLoaderOptions?: OrderedDataLoaderOptions<K, V, C>) {
		this.options = {
			batch: true, // If we don't assume true here, DataLoader will assume false
			cache: true, // These can be overridden by passing false
			...orderedDataLoaderOptions,
		};
		this.batchLoadFn = findByIds;
		this.dataloader = new DataLoader<K, V | undefined, C>(this.orderedResults.bind(this), orderedDataLoaderOptions);
	}

	private async orderedResults(keys: Readonly<K[]>): Promise<(V | undefined)[]> {
		const unorderedResults = (await this.batchLoadFn(keys)) as V[];
		const docsMap = new Map<C, V>();
		unorderedResults.forEach(doc => {
			const key: K = get(doc, this.options.idField || 'id');
			const sKey = this.options.cacheKeyFn ? this.options.cacheKeyFn(key) : ((identity(key) as unknown) as C);
			docsMap.set(sKey, doc);
		});
		return keys.map(key => {
			const sKey = this.options.cacheKeyFn ? this.options.cacheKeyFn(key) : ((identity(key) as unknown) as C);
			return docsMap.get(sKey);
		});
	}

	async load(key: K) {
		return this.dataloader.load(key);
	}

	async loadMany(keys: K[]) {
		return this.dataloader.loadMany(keys);
	}

	async clear(key: K) {
		return this.dataloader.clear(key);
	}

	async clearAll() {
		return this.dataloader.clearAll();
	}

	async prime(key: K, value: V) {
		return this.dataloader.prime(key, value);
	}
}
