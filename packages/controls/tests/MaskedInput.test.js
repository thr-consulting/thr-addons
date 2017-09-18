import React from 'react';
import {shallow} from 'enzyme';
import MaskedInput from '../src/MaskedInput';

describe('MaskedInput', () => {
	it('should render without throwing an error', () => {
		expect(shallow(<MaskedInput mask={{mask: '99-999-99', autoUnmask: true, showMaskOnHover: false}}/>)).toMatchSnapshot();
	});
});
