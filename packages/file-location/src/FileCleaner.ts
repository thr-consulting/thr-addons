import debug from 'debug';
import {pull, uniq} from 'lodash-es';
import type {FileLocationInterface} from './FileLocationInterface';

const d = debug('thx.file-location.FileCleaner');

/** Class that records written files and cleans up after */
export class FileCleaner {
	private _files: string[];

	private _fileLocation: FileLocationInterface;

	constructor(fileLocation: FileLocationInterface) {
		this._files = [];
		this._fileLocation = fileLocation;
	}

	/**
	 * Adds a file to be cleaned
	 * @param filename
	 */
	add(filename: string) {
		this._files.push(filename);
		this._files = uniq(this._files);
	}

	/**
	 * Removes a file to be cleaned
	 * @param filename
	 */
	remove(filename: string) {
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
		await Promise.all(this._files.map(filename => this._fileLocation.deleteObject(filename)));
		this._files = [];
	}

	/**
	 * Resets the file cleaner
	 */
	reset() {
		this._files = [];
	}
}
