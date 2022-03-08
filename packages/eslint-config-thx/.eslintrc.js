process.env.ESLINT_CONFIG_THX = JSON.stringify({
	typescript: false,
	babel: false,
	jest: false,
});

module.exports = {
	extends: ['@thx/eslint-config-thx'],
};
