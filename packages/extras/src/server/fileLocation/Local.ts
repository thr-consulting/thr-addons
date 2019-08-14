import debug from 'debug';
import fs from 'fs';
import path from 'path';
import deleteEmpty from 'delete-empty';
import {mkdirp, fileExists} from '../fsStuff';
import {FileLocationInterface} from './FileLocationInterface';

const d = debug('app.docs.Local');

export default class Local implements FileLocationInterface {
	_rootPath: string;
	_publishUrl: string | undefined;

	constructor({rootPath, publishUrl}: {rootPath: string, publishUrl?: string}) {
		this._rootPath = path.resolve(rootPath);
		this._publishUrl = publishUrl;

		mkdirp(this._rootPath);
	}

	async createBucket() {
		throw new Error('Not implemented for Local location');
	}

	async putObject(name, stream) {
		const full = this.getFullName(name);
		await mkdirp(path.dirname(full));
		await new Promise((resolve, reject) => {
			const writeStream = fs.createWriteStream(full);
			writeStream.on('close', () => resolve());
			writeStream.on('error', reject);
			stream.pipe(writeStream);
		});
	}

	getObject(name) {
		return fs.createReadStream(this.getFullName(name));
	}

	async deleteObject(name) {
		if (await this.objectExists(this.getFullName(name))) {
			await new Promise((resolve, reject) => {
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

	getObjectUrl(name): string {
		if (!this._publishUrl) throw new Error('Publish URL not specified');
		return `${this._publishUrl}/static/${name}`;
	}

	putObjectUrl(): string {
		throw new Error('Not implemented for Local location');
	}

	async objectExists(name) {
		return fileExists(this.getFullName(name));
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
