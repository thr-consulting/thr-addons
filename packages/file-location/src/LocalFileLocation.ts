import debug from 'debug';
import deleteEmpty from 'delete-empty';
import fs from 'fs';
import {mkdirp, pathExists} from 'fs-extra';
import path from 'path';
import type {Readable} from 'stream';
import type {FileLocationInterface} from './FileLocationInterface';

const d = debug('thx.file-location.LocalFileLocation');

export class LocalFileLocation implements FileLocationInterface {
	_rootPath: string;
	_publishUrl: string | undefined;

	constructor({rootPath, publishUrl}: {rootPath: string; publishUrl?: string}) {
		this._rootPath = path.resolve(rootPath);
		this._publishUrl = publishUrl;

		mkdirp(this._rootPath);
	}

	async createBucket() {
		throw new Error('Not implemented for LocalFileLocation');
	}

	async putObject(name: string, stream: Readable): Promise<void> {
		const full = this.getFullName(name);
		await mkdirp(path.dirname(full));
		await new Promise<void>((resolve, reject) => {
			const writeStream = fs.createWriteStream(full);
			writeStream.on('close', () => resolve());
			writeStream.on('error', reject);
			stream.pipe(writeStream);
		});
	}

	getObject(name: string): Readable {
		return fs.createReadStream(this.getFullName(name));
	}

	async deleteObject(name: string): Promise<void> {
		if (await this.objectExists(this.getFullName(name))) {
			await new Promise<void>((resolve, reject) => {
				fs.unlink(this.getFullName(name), err => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			});
			try {
				await deleteEmpty(this._rootPath);
			} catch (err) {
				d(err);
			}
		}
		return Promise.resolve();
	}

	getObjectUrl(name: string): string {
		if (!this._publishUrl) throw new Error('Publish URL not specified');
		return `${this._publishUrl}/static/${name}`;
	}

	putObjectUrl(): string {
		throw new Error('Not implemented for Local location');
	}

	async objectExists(name: string): Promise<boolean> {
		return pathExists(this.getFullName(name));
	}

	getFullName(name: string): string {
		return path.resolve(this._rootPath, name.split('/').join(path.sep));
	}

	getLocationPath(): string {
		return this._rootPath;
	}

	locationType(): string {
		return 'local';
	}
}
