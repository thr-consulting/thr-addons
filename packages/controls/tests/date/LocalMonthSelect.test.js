import React from 'react';
import {shallow} from 'enzyme';
import LocalMonthSelect from '../../src/date/LocalMonthSelect';

describe('LocalMonthSelect', () => {
	it('should render without throwing an error', () => {
		expect(shallow(
			<LocalMonthSelect/>
		)).toMatchSnapshot();
	});

	/*
	it('should respond to changes', () => {
		const mockOnChange = jest.fn();

		const wrapper = mount(
			<LocalMonthSelect onChange={mockOnChange}/>
		);
		const u = wrapper.find('div.selection.dropdown');
		u.simulate('click');
		u.simulate('keydown', {which: 40});
		u.simulate('keydown', {which: 13});

		expect(mockOnChange.mock.calls.length).toBe(1);
		// expect(mockOnChange.mock.calls[0][0]).toEqual('blah blah');
	});
	*/
});
