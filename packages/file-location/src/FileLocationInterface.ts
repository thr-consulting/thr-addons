import type {Readable} from 'node:stream';

export interface FileLocationInterface {
	bucket?: string;
	basePath?: string;
	createBucket(bucket: string): Promise<void>;
	putObject(name: string, stream: Readable, mimetype?: string): Promise<void>;
	getObject(name: string): Promise<Readable>;
	deleteObject(name: string): Promise<void>;
	getObjectUrl(name: string): Promise<string>;
	putObjectUrl(name: string, mimetype?: string): Promise<string>;
	getObjectSize(name: string): Promise<number | undefined>;
	objectExists(name: string): Promise<boolean>;
	locationType(): string;
	listObjects(prefix?: string, maxKeys?: number, cursor?: string): Promise<{objects: string[]; nextCursor?: string}>;
}
