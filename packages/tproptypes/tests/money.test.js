import React from 'react';
import {shallow} from 'enzyme';
import Money from 'js-money';
import TPropTypes from '../src/index';

describe('Money', () => {
	const Comp = props => (
		<div>
			{props.money.amount} {props.money.currency}
		</div>
	);
	Comp.propTypes = {money: TPropTypes.money};

	it('renders without error', () => {
		expect(shallow(<Comp money={new Money(500, Money.CAD)}/>)).toMatchSnapshot();
	});
});
