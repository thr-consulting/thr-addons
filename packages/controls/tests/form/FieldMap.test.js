import React from 'react';
import {shallow, mount} from 'enzyme';
import {Input} from 'semantic-ui-react';
import FieldMap from '../../src/form/FieldMap';

describe('FieldMap', () => {
	it('should render without throwing an error', () => {
		const mockOnChange = jest.fn();

		expect(shallow(
			<FieldMap
				value="a"
				as={Input}
				asValue="value"
				onChange={mockOnChange}
			/>)).toMatchSnapshot();
	});

	it('should respond to changes', () => {
		const mockOnChange = jest.fn();

		const wrapper = mount(
			<FieldMap
				value="initial value"
				as={Input}
				asValue="value"
				onChange={mockOnChange}
			/>);
		const u = wrapper.find('input');
		u.simulate('change', {target: {value: 'blah blah'}});

		expect(mockOnChange.mock.calls.length).toBe(1);
		expect(mockOnChange.mock.calls[0][0]).toEqual('blah blah');
	});
});
