import {useArgs} from '@storybook/client-api';
import type {StoryFn, Meta} from '@storybook/react';
/* eslint-disable react-hooks/rules-of-hooks */
import debug from 'debug';
import '../DatePicker/styles.css';
import {LocalMonthSelect} from './LocalMonthSelect';

const d = debug('thx.controls.date.LocalMonthSelect.localmonthselect.stories');

export default {
	title: 'Date/LocalMonthSelect',
	argTypes: {
		value: {control: {type: 'text'}},
		onChange: {type: 'function'},
		year: {type: 'number'},
		onBlur: {type: 'function'},
	},
} as Meta;

const t: StoryFn<typeof LocalMonthSelect> = args => {
	const [, updateArgs] = useArgs();

	return (
		<LocalMonthSelect
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
	value: null,
	year: new Date().getFullYear(),
};
