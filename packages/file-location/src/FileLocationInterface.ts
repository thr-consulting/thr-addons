import type {Readable} from 'node:stream';

export interface FileLocationInterface {
	bucket?: string;
	basePath?: string;
	createBucket(bucket: string): Promise<void>;
	putObject(name: string, stream: Readable, mimetype?: string): Promise<void>;
	getObject(name: string): Readable;
	deleteObject(name: string): Promise<void>;
	getObjectUrl(name: string): string;
	putObjectUrl(name: string, mimetype?: string): string;
	getObjectSize(name: string): Promise<number | undefined>;
	objectExists(name: string): Promise<boolean>;
	locationType(): string;
}
