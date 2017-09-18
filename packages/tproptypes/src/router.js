// @flow

import PropTypes from 'prop-types';

/**
 * React Router v4 Location object
 */
export const location = PropTypes.shape({
	hash: PropTypes.string.isRequired,
	key: PropTypes.string,
	pathname: PropTypes.string.isRequired,
	search: PropTypes.string.isRequired,
	state: PropTypes.object,
});

/**
 * React Router v4 History
 */
export const history = PropTypes.shape({
	action: PropTypes.string.isRequired,
	block: PropTypes.func,
	createHref: PropTypes.func,
	go: PropTypes.func,
	goBack: PropTypes.func,
	goForward: PropTypes.func,
	length: PropTypes.number,
	listen: PropTypes.func,
	location,
	push: PropTypes.func,
	replace: PropTypes.func,
});
