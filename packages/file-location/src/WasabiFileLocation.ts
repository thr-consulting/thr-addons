import {
	type S3,
	type S3ClientConfig,
	S3Client,
	CreateBucketCommand,
	BucketCannedACL,
	GetObjectCommand,
	DeleteObjectCommand,
	PutObjectCommand,
} from '@aws-sdk/client-s3';
import {Upload} from '@aws-sdk/lib-storage';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import debug from 'debug';
import {find} from 'lodash-es';
import path from 'path';
import type {Readable} from 'stream';
import type {FileLocationInterface} from './FileLocationInterface';

const d = debug('thx.file-location.WasabiFileLocation');

export class WasabiFileLocation implements FileLocationInterface {
	wasabi: S3;

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
		options?: S3ClientConfig;
	}) {
		// @ts-ignore
		this.wasabi = new S3Client({
			endpoint,
			credentials: {
				accessKeyId: accessKey,
				secretAccessKey: secret,
			},
			...options,
		});

		this.bucket = bucket;
		this.basePath = basePath || '';

		// Create bucket if it doesn't exist
		this.createBucket(this.bucket, 'private', true).catch(e => d(e));
	}

	/**
	 * Creates a new bucket
	 * @param bucket
	 * @param acl - Either `private` or `public-read`
	 * @param checkIfExists
	 */
	async createBucket(bucket: string, acl = BucketCannedACL.private, checkIfExists = false) {
		if (checkIfExists) {
			const buckets = await this.wasabi.listBuckets();
			const checkBucket = find(buckets.Buckets, {Name: bucket});
			if (checkBucket) return;
		}

		await this.wasabi.send(
			new CreateBucketCommand({
				Bucket: bucket,
				ACL: acl,
			}),
		);
	}

	async putObject(name: string, stream: Readable, mimetype: string) {
		const upload = new Upload({
			client: this.wasabi,
			params: {
				Bucket: this.bucket,
				Key: this.getFullName(name),
				Body: stream,
				ContentType: mimetype || undefined,
			},
		});

		await upload.done();
	}

	async getObject(name: string): Promise<Readable> {
		const res = await this.wasabi.send(
			new GetObjectCommand({
				Bucket: this.bucket,
				Key: this.getFullName(name),
			}),
		);

		if (!res.Body) {
			throw new Error('Empty object body');
		}

		return res.Body as Readable;
	}

	async deleteObject(name: string) {
		await this.wasabi.send(
			new DeleteObjectCommand({
				Bucket: this.bucket,
				Key: this.getFullName(name),
			}),
		);
	}

	getObjectUrl(name: string, {expires} = {expires: 60}): Promise<string> {
		const command = new GetObjectCommand({
			Bucket: this.bucket,
			Key: this.getFullName(name),
		});

		return getSignedUrl(this.wasabi, command, {expiresIn: expires});
	}

	async putObjectUrl(name: string, mimetype?: string, {expires} = {expires: 60}): Promise<string> {
		const command = new PutObjectCommand({
			Bucket: this.bucket,
			Key: this.getFullName(name),
			ContentType: mimetype || undefined,
		});

		return getSignedUrl(this.wasabi, command, {expiresIn: expires});
	}

	async getObjectSize(name: string) {
		try {
			const headObject = await this.wasabi.headObject({
				Bucket: this.bucket,
				Key: this.getFullName(name),
			});
			return headObject.ContentLength;
		} catch (err: any) {
			if (err.statusCode === 404) return undefined;
			throw err;
		}
	}

	async objectExists(name: string): Promise<boolean> {
		try {
			await this.wasabi.headObject({
				Bucket: this.bucket,
				Key: this.getFullName(name),
			});
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
		const response = await this.wasabi.listObjectsV2({
			Bucket: this.bucket,
			Prefix: prefix,
			MaxKeys: maxKeys,
			ContinuationToken: cursor,
		});
		const objects = (response.Contents ?? []).map(({Key: key}) => key).filter((val): val is string => val !== undefined);
		return {objects, nextCursor: response.NextContinuationToken};
	}
}
