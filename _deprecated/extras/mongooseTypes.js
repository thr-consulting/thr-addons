'use strict';

if (process.env.NODE_ENV === 'production') {
	module.exports = require('./lib/mongooseTypes.min.js');
} else {
	module.exports = require('./lib/mongooseTypes.js');
}
