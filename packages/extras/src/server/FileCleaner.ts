import fs from 'fs';
import uniq from 'lodash/uniq';
import pull from 'lodash/pull';

/** Class that records written files and cleans up after */
export default class FileCleaner {
	_files: string[];

	constructor() {
		this._files = [];
	}

	/**
	 * Adds a file to be cleaned
	 * @param filename
	 */
	add(filename: string) {
		this._files.push(filename);
	}

	/**
	 * Removes a file to be cleaned
	 * @param filename
	 */
	remove(filename) {
		pull(this._files, filename);
	}

	/**
	 * Renames a file
	 * @param a
	 * @param b
	 */
	rename(a: string, b: string) {
		const i = this._files.indexOf(a);
		if (i >= 0) {
			this._files[i] = b;
		}
	}

	/**
	 * Removes files, first checking to make sure they exist
	 */
	async removeFiles() {
		// Make sure the array of files are unique
		this._files = uniq(this._files);

		await Promise.all(this._files.map(filename => new Promise((resolve, reject) => {
			fs.access(filename, isMissing => {
				if (!isMissing) {
					fs.unlink(filename, err => {
						if (err) {
							reject(err);
						} else {
							resolve();
						}
					});
				} else {
					resolve();
				}
			});
		})));
		this._files = [];
	}

	/**
	 * Resets the file cleaner
	 */
	reset() {
		this._files = [];
	}
}
