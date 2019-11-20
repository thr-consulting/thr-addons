import React from 'react';
import {mount} from 'enzyme';
import MonthYearDropdown from '../../src/date/MonthYearDropdown';

describe('MaskedInput', () => {
	it('should render without throwing an error', () => {
		expect(mount(<MonthYearDropdown value={{month: 1, year: 8}} name="test" setFieldValue={() => {}}/>)).toMatchSnapshot();
	});

	it('should render with string values without throwing an error', () => {
		expect(mount(<MonthYearDropdown value={{month: '01', year: '09'}} name="test" setFieldValue={() => {}}/>)).toMatchSnapshot();
	});

	it('should render without values without throwing an error', () => {
		expect(mount(<MonthYearDropdown value={{}} name="test" setFieldValue={() => {}}/>)).toMatchSnapshot();
	});
});
