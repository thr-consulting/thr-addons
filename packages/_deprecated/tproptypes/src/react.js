// @flow

import PropTypes from 'prop-types';

/**
 * React children elements
 */
export const reactElements = PropTypes.oneOfType([
	PropTypes.arrayOf(PropTypes.element),
	PropTypes.element,
]);
