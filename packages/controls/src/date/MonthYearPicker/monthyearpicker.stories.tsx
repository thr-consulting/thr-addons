import {LocalDate} from '@js-joda/core';
import {useArgs} from '@storybook/client-api';
/* eslint-disable react-hooks/rules-of-hooks */
import type {StoryFn, Meta} from '@storybook/react';
import debug from 'debug';
import 'react-datepicker/dist/react-datepicker.css';
import '../DatePicker/styles.css';
import {MonthYearPicker} from './MonthYearPicker';

const d = debug('thx.controls.date.MonthYearPicker.monthyearpicker.stories');

export default {
	title: 'Date/MonthYearPicker',
	argTypes: {
		value: {control: {type: 'text'}},
		onChange: {type: 'function'},
		onChangeRaw: {type: 'function'},
		minDate: {control: {type: 'text'}},
		maxDate: {control: {type: 'text'}},
	},
} as Meta;

const t: StoryFn<typeof MonthYearPicker> = args => {
	const [, updateArgs] = useArgs();

	return (
		<MonthYearPicker
			{...args}
			onChange={value => {
				updateArgs({value});
			}}
		/>
	);
};

export const Main = t.bind({});
Main.args = {
	value: undefined,
};

export const WithMinMaxDates = t.bind({});
WithMinMaxDates.args = {
	...Main.args,
	minDate: LocalDate.now(),
	maxDate: LocalDate.now().plusMonths(5),
};
