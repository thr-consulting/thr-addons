/* eslint-disable global-require */
import React from 'react';
import {shallow, mount} from 'enzyme';
import NotificationSystem from '../src/NotificationSystem';

jest.mock('../src/registerNotificationSystem');

describe('NotificationSystem', () => {
	it('should render without throwing an error', () => {
		expect(shallow(
			<NotificationSystem>
				<div>Hello World</div>
			</NotificationSystem>
		)).toMatchSnapshot();
	});

	it('should register the notification system', () => {
		const reg = require('../src/registerNotificationSystem');
		mount(
			<NotificationSystem>
				<div>Hello World</div>
			</NotificationSystem>
		);
		expect(reg.registerNotificationSystem.mock.calls.length).toBe(1);
	});
});
