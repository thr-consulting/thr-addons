/* eslint-disable global-require */
import {
	dateInit,
} from '../src/util';

jest.mock('react-widgets-moment');

describe('Date initialization', () => {
	it('should call the moment localizer', () => {
		const momentLocalizer = require('react-widgets-moment');
		dateInit();
		expect(momentLocalizer.mock.calls.length).toBe(1);
	});
});
