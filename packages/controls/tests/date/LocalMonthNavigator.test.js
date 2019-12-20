import React from 'react';
import {mount} from 'enzyme';
import LocalMonthNavigator from '../../src/date/LocalMonthNavigator';

describe('MaskedInput', () => {
	it('should render without throwing an error', () => {
		expect(mount(<LocalMonthNavigator name="month" onChange={() => {}}/>)).toMatchSnapshot();
	});
});
