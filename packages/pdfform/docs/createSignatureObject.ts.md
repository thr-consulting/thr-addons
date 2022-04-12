import debug from 'debug';
import merge from 'lodash/merge';
import {PDFSignature} from './signPdf';

const d = debug('app.lib.pdfForm.helperFunctions.createSignatureObject');

/**
 * Creates a object with of the string passed in.
 * @param data, a mapped signature string.
 */
export default function createSignatureObject(data: string): PDFSignature {
	const valueObject: PDFSignature = {
		signature: {type: '', data: ''},
		location: {width: 0, height: 0, x: 0, y: 0, onPage: 0},
	};
	data.split(',').forEach((current) => {
		if (current.includes(' ')) {
			const location = {location: {}};
			current.split(' ').forEach((cur) => {
				if (cur.includes('.')) {
					merge(location.location, {[cur.split('.')[0]]: cur.split('.')[1]});
				}
			});
			merge(valueObject, location);
		} else if (current.includes('.')) {
			merge(valueObject, {[current.split('.')[0]]: current.split('.')[1]});
		}
	});
	return valueObject;
}
