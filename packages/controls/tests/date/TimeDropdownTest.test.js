import React from 'react';
import {mount} from 'enzyme';
import TimeDropdown from '../../src/date/TimeDropdown';

describe('MaskedInput', () => {
	it('should render without throwing an error', () => {
		expect(mount(<TimeDropdown values={{hour: 4, minute: 5, ampm: 'AM'}} fieldName="test" fieldError={() => false}/>)).toMatchSnapshot();
	});

	it('should render without values without throwing an error', () => {
		expect(mount(<TimeDropdown values={{}} fieldName="test" fieldError={() => false}/>)).toMatchSnapshot();
	});
});
