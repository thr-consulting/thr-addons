import React from 'react';
import {mount} from 'enzyme';
import YearNavigator from '../../src/date/YearNavigator';

describe('MaskedInput', () => {
	it('should render without throwing an error', () => {
		expect(mount(<YearNavigator year={2019} onChange={() => {}}/>)).toMatchSnapshot();
	});
});
