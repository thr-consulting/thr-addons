process.env.ESLINT_CONFIG_THX = JSON.stringify({
	typescript: false,
	babel: false,
});

module.exports = {
	extends: ['@thx/eslint-config-thx'],
};
