import React from 'react';
import {mount} from 'enzyme';
import MonthDayDropdown from '../../src/inputs/MonthDayDropdown';

describe('MaskedInput', () => {
	it('should render without throwing an error', () => {
		expect(mount(<MonthDayDropdown values={{month: 1, day: 1}} fieldName="test"/>)).toMatchSnapshot();
	});

	it('should render without values without throwing an error', () => {
		expect(mount(<MonthDayDropdown values={{}} fieldName="test"/>)).toMatchSnapshot();
	});
});
