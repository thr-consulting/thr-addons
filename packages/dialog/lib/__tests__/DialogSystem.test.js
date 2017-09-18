import React from 'react';
import PropTypes from 'prop-types';
import {shallow, mount} from 'enzyme';
import DialogSystem from '../DialogSystem';

function HelloWorld(props) {
	props.func();
	return (
		<div>Hello World</div>
	);
}
HelloWorld.propTypes = {
	func: PropTypes.func,
};

class DialogSystemFunctional extends React.Component {
	static contextTypes = {
		showDialog: PropTypes.func,
	};

	static propTypes = {
		func: PropTypes.func,
	};

	handleClick = () => {
		this.context.showDialog(<HelloWorld func={this.props.func}/>);
	}

	render() {
		return <button onClick={this.handleClick}>Click Me</button>;
	}
}

describe('DialogSystem', () => {
	it('should render without throwing an error', () => {
		expect(shallow(
			<DialogSystem/>
		)).toMatchSnapshot();
	});

	it('should respond to height changes', () => {
		const func = jest.fn();
		const wrapper = mount(
			<DialogSystem>
				<DialogSystemFunctional func={func}/>
			</DialogSystem>
		);
		const button = wrapper.find('button');
		button.simulate('click');
		expect(func.mock.calls.length).toBe(1);
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
