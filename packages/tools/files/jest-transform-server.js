module.exports = require('babel-jest').default.createTransformer({
	presets: [['@imperium/babel-preset-imperium', {client: false, typescript: true}]],
});
