import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withKnobs, text, boolean} from '@storybook/addon-knobs';
import Money from 'js-money';
import {MoneyInput} from '../src';

const stories = storiesOf('Money', module)
	.addDecorator(withKnobs)
	.addDecorator(story => (
		<div style={{width: '300px'}}>{story()}</div>
	));

stories.add('MoneyInput', () => (
	<MoneyInput
		onChange={action('onChange')}
		value={new Money(500, Money.CAD)}
		onDetailsClick={action('onSelect')}
		detailsIcon={text('detailsIcon', 'server')}
		placeholder={text('placeholder')}
		locked={boolean('locked', false)}
	/>
));
