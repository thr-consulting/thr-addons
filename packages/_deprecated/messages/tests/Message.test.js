import React from 'react';
import {shallow} from 'enzyme';
import {MessageComponent} from '../src/Message/Message';

const message = {
	id: 'myid',
	level: 'success',
	message: 'This is a message',
	title: 'This is a title',
};

describe('Messages', () => {
	it('should render without throwing an error', () => {
		const mockClearMessage = jest.fn();
		expect(shallow(
			<MessageComponent message={message} clearMessage={mockClearMessage}/>
		)).toMatchSnapshot();
	});

	it('should allow clearing of messages', () => {
		const mockClearMessage = jest.fn();
		const wrapper = shallow(
			<MessageComponent message={message} clearMessage={mockClearMessage}/>
		);
		wrapper.find('Icon').simulate('click');

		expect(mockClearMessage.mock.calls.length).toBe(1);
		expect(mockClearMessage.mock.calls[0][0]).toEqual(message.id);
	});
});
