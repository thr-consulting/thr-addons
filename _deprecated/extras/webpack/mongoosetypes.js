/* eslint-disable @typescript-eslint/no-var-requires */
const {commonWebpack} = require('@imperium/util');

module.exports = commonWebpack({
	isProduction: process.env.NODE_ENV === 'production',
	isClient: false,
	name: 'thrextrasmongoosetypes',
	entry: './server/mongooseTypes/index.ts',
	outputFile: 'mongooseTypes.js',
});
