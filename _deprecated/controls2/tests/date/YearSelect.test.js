import React from 'react';
import {mount} from 'enzyme';
import YearSelect from '../../src/date/YearSelect';

describe('MaskedInput', () => {
	it('should render without throwing an error', () => {
		expect(mount(<YearSelect year={2019} onChange={() => {}}/>)).toMatchSnapshot();
	});
});
