import React from 'react';
import {shallow} from 'enzyme';
import TPropTypes from '../src/index';

describe('SForm', () => {
	const Comp = props => (
		<div>
			{props.messages.myField[0].message}
		</div>
	);
	Comp.propTypes = {
		messages: TPropTypes.sFieldMessages,
	};

	it('renders without error', () => {
		expect(shallow(
			<Comp
				messages={{
					myField: [{message: 'Something is rotten in the state of Denmark', values: {}}],
				}}
			/>,
		)).toMatchSnapshot();
	});
});
