import React from 'react';
import {shallow} from 'enzyme';
import {Map} from 'immutable';
import {MessagesComponent} from '../Messages';

const messages = new Map({
	default: {
		id: 'myid',
		level: 'success',
		message: 'This is a message',
		title: 'This is a title',
	},
});

describe('Messages', () => {
	it('should render without throwing an error', () => {
		expect(shallow(
			<MessagesComponent messages={messages}/>
		)).toMatchSnapshot();
	});

	it('should render null if no messages are given', () => {
		expect(shallow(<MessagesComponent messages={new Map()}/>)).toMatchSnapshot();
	});
});
