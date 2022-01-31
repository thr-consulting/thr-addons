import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
/* eslint-disable react-hooks/rules-of-hooks */
import debug from 'debug';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../DatePicker/styles.css';
import {LocalTimePicker} from './LocalTimePicker';

const d = debug('thx.controls.date.LocalTimePicker.localtimepicker.stories');

export default {
	title: 'Date/LocalTimePicker',
	argTypes: {
		value: {control: {type: 'text'}},
		onChange: {type: 'function'},
		onChangeRaw: {type: 'function'},
	},
} as Meta;

const t: ComponentStory<typeof LocalTimePicker> = args => {
	const [, updateArgs] = useArgs();

	return (
		<LocalTimePicker
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
};
