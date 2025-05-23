import {useArgs} from '@storybook/client-api';
import type {StoryFn, Meta} from '@storybook/react';
/* eslint-disable react-hooks/rules-of-hooks */
import debug from 'debug';
import {YearSelect} from './YearSelect';

const d = debug('thx.controls.date.YearSelect.yearselect.stories');

export default {
	title: 'Date/YearSelect',
	argTypes: {
		value: {type: 'number'},
		onChange: {type: 'function'},
		onBlur: {type: 'function'},
		minYear: {type: 'number'},
		maxYear: {type: 'number'},
		error: {type: 'boolean'},
	},
} as Meta;

const t: StoryFn<typeof YearSelect> = args => {
	const [, updateArgs] = useArgs();

	return (
		<YearSelect
			{...args}
			onChange={value => {
				updateArgs({value});
				args.onChange && args.onChange(value);
			}}
		/>
	);
};

export const Main = t.bind({});
Main.args = {
	value: new Date().getFullYear(),
	error: false,
};

export const WithError = t.bind({});
WithError.args = {
	...Main.args,
	error: true,
};

export const WithMinMaxYears = t.bind({});
WithMinMaxYears.args = {
	...Main.args,
	minYear: new Date().getFullYear() - 2,
	maxYear: new Date().getFullYear() + 2,
};
