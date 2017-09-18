import {
	addMessage,
	addSuccessMessage,
	addErrorMessage,
	addWarnMessage,
	clearMessage,
	clearMessages,
} from '../src/messagesActions';

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.6920730585883441;
global.Math = mockMath;

const message = {
	id: 'myid',
	level: 'success',
	message: 'This is a message',
	title: 'This is a title',
};

describe('Message Actions', () => {
	it('should return a message with a random id', () => {
		const ret = addMessage(message.level, message.message, message.title);
		expect(ret).toMatchSnapshot();
	});

	it('should return a message with a set id', () => {
		const ret = addMessage(message.level, message.message, message.title, '1234');
		expect(ret).toMatchSnapshot();
	});

	it('should return a success message', () => {
		const ret = addSuccessMessage(message.message);
		expect(ret).toMatchSnapshot();
	});

	it('should return an error message', () => {
		const ret = addErrorMessage(message.message);
		expect(ret).toMatchSnapshot();
	});

	it('should return a warning message', () => {
		const ret = addWarnMessage(message.message);
		expect(ret).toMatchSnapshot();
	});

	it('should return a clear message action', () => {
		const ret = clearMessage('1234');
		expect(ret).toMatchSnapshot();
	});

	it('should return a clear all messages action', () => {
		const ret = clearMessages();
		expect(ret).toMatchSnapshot();
	});
});
