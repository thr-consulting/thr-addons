import React from 'react';
import {shallow, mount} from 'enzyme';
import {Form} from 'semantic-ui-react';
import RadioGroup from '../../src/inputs/RadioGroup';

describe('RadioGroup', () => {
	it('should render without throwing an error', () => {
		expect(shallow(
			<RadioGroup>
				<Form.Radio label="ABC" value="abc"/>
				<Form.Radio label="DEF" value="def"/>
			</RadioGroup>
		)).toMatchSnapshot();
	});

	it('should respond to changes', () => {
		const mockOnChange = jest.fn();

		const wrapper = mount(
			<RadioGroup onChange={mockOnChange}>
				<Form.Radio label="ABC" value="abc"/>
				<Form.Radio label="DEF" value="def"/>
			</RadioGroup>,
		);
		const u = wrapper.find('.ui.radio.checkbox').first();
		u.simulate('click');

		expect(mockOnChange.mock.calls.length).toBe(1);
		expect(mockOnChange.mock.calls[0][0]).toEqual('abc');
	});
});
