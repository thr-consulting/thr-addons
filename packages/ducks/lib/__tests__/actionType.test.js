import {actionType, changed, ready, error, unsubscribed} from '..';

describe('actionType', () => {
	it('should return an actionType', () => {
		const {MY_ACTION} = actionType('MyPrefix');
		expect(MY_ACTION).toBe('MyPrefix_MY_ACTION');
	});

	it('should return a changed actionType', () => {
		const {MY_ACTION} = actionType('MyPrefix');
		expect(changed(MY_ACTION)).toBe('MyPrefix_MY_ACTION/changed');
	});

	it('should return a ready actionType', () => {
		const {MY_ACTION} = actionType('MyPrefix');
		expect(ready(MY_ACTION)).toBe('MyPrefix_MY_ACTION/ready');
	});

	it('should return an error actionType', () => {
		const {MY_ACTION} = actionType('MyPrefix');
		expect(error(MY_ACTION)).toBe('MyPrefix_MY_ACTION/error');
	});

	it('should return an unsubscribed actionType', () => {
		const {MY_ACTION} = actionType('MyPrefix');
		expect(unsubscribed(MY_ACTION)).toBe('MyPrefix_MY_ACTION/unsubscribed');
	});
});
