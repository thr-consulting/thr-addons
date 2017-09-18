import React from 'react';
import {shallow} from 'enzyme';
import Dialog from '../Dialog';
import DialogButtons from '../DialogButtons';

describe('DialogButtons', () => {
	it('should render a single child without throwing an error', () => {
		expect(shallow(
			<Dialog>
				<div>Hello World</div>
			</Dialog>
		)).toMatchSnapshot();
	});

	it('should render multiple children without throwing an error', () => {
		expect(shallow(
			<Dialog>
				<div>Hello</div>
				<div>World</div>
			</Dialog>
		)).toMatchSnapshot();
	});

	it('should render multiple children with a DialogButtons instance without throwing an error', () => {
		expect(shallow(
			<Dialog>
				<div>Hello</div>
				<div>World</div>
				<DialogButtons/>
			</Dialog>
		)).toMatchSnapshot();
	});

	// it('should respond to changes', () => {
	// 	const mockOnChange = jest.fn();
	//
	// 	const wrapper = mount(
	// 		<FieldMap
	// 			value="initial value"
	// 			as={Input}
	// 			asValue="value"
	// 			onChange={mockOnChange}
	// 		/>);
	// 	const u = wrapper.find('input');
	// 	u.simulate('change', {target: {value: 'blah blah'}});
	//
	// 	expect(mockOnChange.mock.calls.length).toBe(1);
	// 	expect(mockOnChange.mock.calls[0][0]).toEqual('blah blah');
	// });
});
