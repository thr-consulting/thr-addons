import React from 'react';
import {shallow} from 'enzyme';
import MoneyInputMask from '../../src/money/MoneyInputMask';

describe('MoneyInputMask', () => {
	it('should render without throwing an error', () => {
		expect(shallow(
			<MoneyInputMask/>
		)).toMatchSnapshot();
	});
});
