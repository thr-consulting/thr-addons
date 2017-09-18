import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withKnobs, text, boolean} from '@storybook/addon-knobs';
import {DateTimePicker, LocalMonthSelect, LocalDatePicker, MonthSelect, dateInit} from '../src';

dateInit();

const stories = storiesOf('Date', module)
	.addDecorator(withKnobs)
	.addDecorator(story => (
		<div style={{width: '300px'}}>{story()}</div>
	));

stories.add('DateTimePicker', () => (
	<DateTimePicker
		onChange={action('onChange')}
		onSelect={action('onSelect')}
		date={boolean('date', true)}
		time={boolean('time', true)}
		format={text('format', 'M/d/YYYY')}
		editFormat={text('editFormat', 'M/d/YYYY')}
	/>
));

stories.add('LocalDatePicker', () => (
	<LocalDatePicker
		onChange={action('onChange')}
		onSelect={action('onSelect')}
		date={boolean('date', true)}
		format={text('format', 'M/d/YYYY')}
		editFormat={text('editFormat', 'M/d/YYYY')}
	/>
));

stories.add('LocalMonthSelect', () => (
	<LocalMonthSelect
		onChange={action('onChange')}
	/>
));

stories.add('MonthSelect', () => (
	<MonthSelect
		onChange={action('onChange')}
	/>
));
