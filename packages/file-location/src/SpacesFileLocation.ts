import debug from 'debug';
import AWS from 'aws-sdk';
import find from 'lodash/find';
import path from 'path';
import {Readable} from 'stream';
import {FileLocationInterface} from './FileLocationInterface';

const d = debug('thx.file-location.SpacesFileLocation');

export default class SpacesFileLocation implements FileLocationInterface {
	_spaces: AWS.S3;
	_bucket: string;
	_basePath: string;

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
		this._spaces = new AWS.S3({
			endpoint: new AWS.Endpoint(endpoint),
			accessKeyId: accessKey,
			secretAccessKey: secret,
		});

		this._bucket = bucket;
		this._basePath = basePath || '';

		// Create bucket if it doesn't exist
		this.createBucket(this._bucket, 'private', true);
	}

	/**
	 * Creates a new bucket
	 * @param bucket
	 * @param acl - Either `private` or `public-read`
	 * @param checkIfExists
	 */
	async createBucket(bucket: string, acl = 'private', checkIfExists = false) {
		if (checkIfExists) {
			const buckets = await this._spaces.listBuckets().promise();
			const checkBucket = find(buckets.Buckets, {Name: bucket});
			if (checkBucket) return;
		}

		await this._spaces
			.createBucket({
				Bucket: bucket,
				ACL: acl,
			})
			.promise();
	}

	async putObject(name: string, stream: Readable, mimetype: string) {
		await this._spaces
			.upload({
				Bucket: this._bucket,
				Key: this.getFullName(name),
				Body: stream,
				ContentType: mimetype || undefined,
			})
			.promise();
	}

	getObject(name: string): Readable {
		return this._spaces
			.getObject({
				Bucket: this._bucket,
				Key: this.getFullName(name),
			})
			.createReadStream();
	}

	async deleteObject(name: string) {
		await this._spaces
			.deleteObject({
				Bucket: this._bucket,
				Key: this.getFullName(name),
			})
			.promise();
	}

	getObjectUrl(name: string, {expires} = {expires: 60}): string {
		return this._spaces.getSignedUrl('getObject', {
			Bucket: this._bucket,
			Key: this.getFullName(name),
			Expires: expires,
		});
	}

	putObjectUrl(name: string, mimetype?: string, {expires} = {expires: 60}): string {
		return this._spaces.getSignedUrl('putObject', {
			Bucket: this._bucket,
			Key: this.getFullName(name),
			Expires: expires,
			ContentType: mimetype || undefined, // 'application/pdf',
		});
	}

	async objectExists(name: string): Promise<boolean> {
		try {
			await this._spaces
				.headObject({
					Bucket: this._bucket,
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
		return path.join(this._basePath, name);
	}

	locationType(): string {
		return 'spaces';
	}
}
