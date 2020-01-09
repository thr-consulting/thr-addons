import React from 'react';
import {shallow} from 'enzyme';
import {LocalDate} from 'js-joda';
import TPropTypes from '../src/index';

describe('Local Date', () => {
	const Comp = props => (
		<div>
			{props.date.toString()}
		</div>
	);
	Comp.propTypes = {date: TPropTypes.localDate};

	it('renders without error', () => {
		expect(shallow(<Comp date={LocalDate.of(2017, 6, 23)}/>)).toMatchSnapshot();
	});
});
