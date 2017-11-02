import React from 'react';
import {shallow} from 'enzyme';
import {Map} from 'immutable';
import {MessagesComponent} from '../src/Messages';

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

	it('should render empty if no messages are given', () => {
		expect(shallow(<MessagesComponent messages={new Map()}/>)).toMatchSnapshot();
	});
});
