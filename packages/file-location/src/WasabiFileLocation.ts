import AWS from 'aws-sdk';
import debug from 'debug';
import {find} from 'lodash-es';
import path from 'path';
import type {Readable} from 'stream';
import type {FileLocationInterface} from './FileLocationInterface';

const d = debug('thx.file-location.WasabiFileLocation');

export class WasabiFileLocation implements FileLocationInterface {
	wasabi: AWS.S3;
	bucket: string;
	basePath: string;

	constructor({
		endpoint,
		accessKey,
		secret,
		bucket,
		basePath,
		options,
	}: {
		endpoint: string;
		accessKey: string;
		secret: string;
		bucket: string;
		basePath?: string;
		options?: AWS.S3.Types.ClientConfiguration;
	}) {
		// @ts-ignore
		this.wasabi = new AWS.S3({
			endpoint,
			accessKeyId: accessKey,
			secretAccessKey: secret,
			...options,
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
			const buckets = await this.wasabi.listBuckets().promise();
			const checkBucket = find(buckets.Buckets, {Name: bucket});
			if (checkBucket) return;
		}

		await this.wasabi
			.createBucket({
				Bucket: bucket,
				ACL: acl,
			})
			.promise();
	}

	async putObject(name: string, stream: Readable, mimetype: string) {
		await this.wasabi
			.upload({
				Bucket: this.bucket,
				Key: this.getFullName(name),
				Body: stream,
				ContentType: mimetype || undefined,
			})
			.promise();
	}

	getObject(name: string): Readable {
		return this.wasabi
			.getObject({
				Bucket: this.bucket,
				Key: this.getFullName(name),
			})
			.createReadStream();
	}

	async deleteObject(name: string) {
		await this.wasabi
			.deleteObject({
				Bucket: this.bucket,
				Key: this.getFullName(name),
			})
			.promise();
	}

	getObjectUrl(name: string, {expires} = {expires: 60}): string {
		return this.wasabi.getSignedUrl('getObject', {
			Bucket: this.bucket,
			Key: this.getFullName(name),
			Expires: expires,
		});
	}

	putObjectUrl(name: string, mimetype?: string, {expires} = {expires: 60}): string {
		return this.wasabi.getSignedUrl('putObject', {
			Bucket: this.bucket,
			Key: this.getFullName(name),
			Expires: expires,
			ContentType: mimetype || undefined, // 'application/pdf',
		});
	}

	async getObjectSize(name: string) {
		try {
			const headObject = await this.wasabi
				.headObject({
					Bucket: this.bucket,
					Key: this.getFullName(name),
				})
				.promise();
			return headObject.ContentLength;
		} catch (err: any) {
			if (err.statusCode === 404) return undefined;
			throw err;
		}
	}

	async objectExists(name: string): Promise<boolean> {
		try {
			await this.wasabi
				.headObject({
					Bucket: this.bucket,
					Key: this.getFullName(name),
				})
				.promise();
			return true;
		} catch (err: any) {
			if (err.statusCode === 404) return false;
			throw err;
		}
	}

	getFullName(name: string): string {
		return path.join(this.basePath, name);
	}

	locationType(): string {
		return 'wasabi';
	}

	async listObjects(prefix?: string, maxKeys = 1000, cursor?: string) {
		const response = await this.wasabi
			.listObjectsV2({
				Bucket: this.bucket,
				Prefix: prefix,
				MaxKeys: maxKeys,
				ContinuationToken: cursor,
			})
			.promise();
		const objects = (response.Contents ?? []).map(({Key: key}) => key).filter((val): val is string => val !== undefined);
		return {objects, nextCursor: response.NextContinuationToken};
	}
}
