/* eslint-disable react-hooks/rules-of-hooks */
import {LocalDate} from '@js-joda/core';
import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
import debug from 'debug';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../DatePicker/styles.css';
import {LocalDatePicker} from './LocalDatePicker';

const d = debug('thx.controls.date.LocalDatePicker.localdatepicker.stories');

export default {
	title: 'Date/LocalDatePicker',
	argTypes: {
		value: {type: 'string', control: {type: 'text'}},
		minDate: {type: 'string', control: {type: 'text'}},
		maxDate: {type: 'string', control: {type: 'text'}},
		onChange: {type: 'function'},
		onChangeRaw: {type: 'function'},
	},
} as Meta;

const t: ComponentStory<typeof LocalDatePicker> = args => {
	const [, updateArgs] = useArgs();

	return (
		<LocalDatePicker
			{...args}
			onChange={value => {
				updateArgs({value});
				args.onChange && args.onChange(value);
			}}
		/>
	);
};

export const Main: ComponentStory<typeof LocalDatePicker> = t.bind({});
Main.args = {
	value: LocalDate.now(),
};

export const WithMinMaxDates: ComponentStory<typeof LocalDatePicker> = t.bind({});
WithMinMaxDates.args = {
	value: LocalDate.now(),
	minDate: LocalDate.now().minusMonths(2),
	maxDate: LocalDate.now().plusMonths(2),
};
