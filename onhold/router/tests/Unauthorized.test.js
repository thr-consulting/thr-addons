import React from 'react';
import {shallow} from 'enzyme';
import Unauthorized from '../src/components/Unauthorized/index';

describe('Unauthorized', () => {
	it('should render without throwing an error', () => {
		expect(shallow(<Unauthorized/>)).toMatchSnapshot();
	});
});
