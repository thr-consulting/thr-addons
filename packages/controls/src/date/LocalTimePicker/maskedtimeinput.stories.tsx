import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
/* eslint-disable react-hooks/rules-of-hooks */
import debug from 'debug';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../DatePicker/styles.css';
import {MaskedTimeInput, MaskedTimeInputValue} from './MaskedTimeInput';

const d = debug('thx.controls.date.LocalTimePicker.maskedtimeinput.stories');

export default {
	title: 'Date/MaskedTimeInput',
	argTypes: {
		value: {control: {type: 'text'}},
		onChange: {type: 'function'},
	},
} as Meta;

const t: ComponentStory<typeof MaskedTimeInput> = args => {
	const [, updateArgs] = useArgs();

	return (
		<MaskedTimeInput
			{...args}
			onChange={(value: MaskedTimeInputValue) => {
				updateArgs({value: value.target.value});
				args.onChange && args.onChange(value);
			}}
		/>
	);
};

export const Main = t.bind({});
Main.args = {
	value: '10:00am',
};
