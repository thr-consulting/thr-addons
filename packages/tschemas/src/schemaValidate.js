// @flow

import omit from 'lodash/omit';
import debug from 'debug';

const d = debug('thx:tschemas:schemaValidate');

/**
 * Validates a schema on the server. This function is for use on the server only!
 * Returns null if validation passed. Returns a yup ValidationError if it fails.
 * Does not include the object as 'value'.
 * @function schemaValidate
 * @tag Server
 * @param {YupSchema} schema - The schema to validate against.
 * @param {object} obj - The object to validate.
 * @param validateOptions - Custom yup validate options.
 * @returns {object}
 */
export default async function schemaValidate(schema: any, obj: any, validateOptions: Object) {
	try {
		await schema.validate(obj, validateOptions || {strict: true});
		return null;
	} catch (err) {
		d('Validation error:', err);
		return omit(err, 'value');
	}
}
