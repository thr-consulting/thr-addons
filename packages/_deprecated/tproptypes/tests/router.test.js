import React from 'react';
import {shallow} from 'enzyme';
import TPropTypes from '../src/index';

describe('Router Location', () => {
	const Comp = props => (
		<div>
			{props.location.hash}
			{props.location.key}
			{props.location.pathname}
			{props.location.search}
		</div>
	);
	Comp.propTypes = {
		location: TPropTypes.location.isRequired,
	};

	it('renders without error', () => {
		expect(shallow(
			<Comp
				location={{
					hash: '#myhash',
					pathname: '/this/is/my/path',
					search: '?var=123',
					state: {},
				}}
			/>,
		)).toMatchSnapshot();
	});
});

describe('RouterHistory', () => {
	const Comp = props => (
		<div>
			{props.history.action}
			{props.history.length}
		</div>
	);
	Comp.propTypes = {
		history: TPropTypes.history.isRequired,
	};

	it('renders without error', () => {
		expect(shallow(
			<Comp
				history={{
					action: 'PUSH',
					length: 15,
				}}
			/>,
		)).toMatchSnapshot();
	});
});
