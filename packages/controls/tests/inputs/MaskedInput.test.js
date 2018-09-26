import React from 'react';
import {mount} from 'enzyme';
import MaskedInput from '../../src/inputs/MaskedInput';

describe('MaskedInput', () => {
	it('should render without throwing an error', () => {
		expect(mount(<MaskedInput mask={{mask: '99-999-99', autoUnmask: true, showMaskOnHover: false}}/>)).toMatchSnapshot();
	});
});
