import debug from 'debug';
import uniq from 'lodash/uniq';
import pull from 'lodash/pull';
import {FileLocationInterface} from './fileLocation/FileLocationInterface';
import {rmFiles} from './fsStuff';

const d = debug('thx.extras.FileCleaner');

/** Class that records written files and cleans up after */
export default class FileCleaner {
	_files: string[];
	_fileLocation: FileLocationInterface | undefined;

	constructor(fileLocation?: FileLocationInterface) {
		this._files = [];
		this._fileLocation = fileLocation;
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
		if (this._fileLocation) {
			await Promise.all(this._files.map(filename => this._fileLocation.deleteObject(filename)));
		} else {
			await rmFiles(this._files);
		}
		this._files = [];
	}

	/**
	 * Resets the file cleaner
	 */
	reset() {
		this._files = [];
	}
}
