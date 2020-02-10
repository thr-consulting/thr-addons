import {Readable} from 'stream';

export interface FileLocationInterface {
	createBucket(bucket: string): Promise<void>;
	putObject(name: string, stream: Readable, mimetype?: string): Promise<void>;
	getObject(name: string): Readable;
	deleteObject(name: string): Promise<void>;
	getObjectUrl(name: string): string;
	putObjectUrl(name: string, mimetype?: string): string;
	objectExists(name: string): Promise<boolean>;
	locationType(): string;
}
