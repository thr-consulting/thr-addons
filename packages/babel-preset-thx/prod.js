/* eslint-disable func-names */
const create = require('./create');

module.exports = function (api, opts) {
	return create(api, opts, 'production');
};
