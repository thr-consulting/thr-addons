import debug from 'debug';
import AWS from 'aws-sdk';
import find from 'lodash/find';
import path from 'path';
import type {Readable} from 'stream';
import type {FileLocationInterface} from './FileLocationInterface';

const d = debug('thx.file-location.SpacesFileLocation');

export default class SpacesFileLocation implements FileLocationInterface {
	spaces: AWS.S3;
	bucket: string;
	basePath: string;

	constructor({
		endpoint,
		accessKey,
		secret,
		bucket,
		basePath,
	}: {
		endpoint: string;
		accessKey: string;
		secret: string;
		bucket: string;
		basePath?: string;
	}) {
		// @ts-ignore
		this.spaces = new AWS.S3({
			endpoint,
			accessKeyId: accessKey,
			secretAccessKey: secret,
		});

		this.bucket = bucket;
		this.basePath = basePath || '';

		// Create bucket if it doesn't exist
		this.createBucket(this.bucket, 'private', true);
	}

	/**
	 * Creates a new bucket
	 * @param bucket
	 * @param acl - Either `private` or `public-read`
	 * @param checkIfExists
	 */
	async createBucket(bucket: string, acl = 'private', checkIfExists = false) {
		if (checkIfExists) {
			const buckets = await this.spaces.listBuckets().promise();
			const checkBucket = find(buckets.Buckets, {Name: bucket});
			if (checkBucket) return;
		}

		await this.spaces
			.createBucket({
				Bucket: bucket,
				ACL: acl,
			})
			.promise();
	}

	async putObject(name: string, stream: Readable, mimetype: string) {
		await this.spaces
			.upload({
				Bucket: this.bucket,
				Key: this.getFullName(name),
				Body: stream,
				ContentType: mimetype || undefined,
			})
			.promise();
	}

	getObject(name: string): Readable {
		return this.spaces
			.getObject({
				Bucket: this.bucket,
				Key: this.getFullName(name),
			})
			.createReadStream();
	}

	async deleteObject(name: string) {
		await this.spaces
			.deleteObject({
				Bucket: this.bucket,
				Key: this.getFullName(name),
			})
			.promise();
	}

	getObjectUrl(name: string, {expires} = {expires: 60}): string {
		return this.spaces.getSignedUrl('getObject', {
			Bucket: this.bucket,
			Key: this.getFullName(name),
			Expires: expires,
		});
	}

	putObjectUrl(name: string, mimetype?: string, {expires} = {expires: 60}): string {
		return this.spaces.getSignedUrl('putObject', {
			Bucket: this.bucket,
			Key: this.getFullName(name),
			Expires: expires,
			ContentType: mimetype || undefined, // 'application/pdf',
		});
	}

	async objectExists(name: string): Promise<boolean> {
		try {
			await this.spaces
				.headObject({
					Bucket: this.bucket,
					Key: this.getFullName(name),
				})
				.promise();
			return true;
		} catch (err) {
			if (err.statusCode === 404) return false;
			throw err;
		}
	}

	getFullName(name: string): string {
		return path.join(this.basePath, name);
	}

	locationType(): string {
		return 'spaces';
	}
}
