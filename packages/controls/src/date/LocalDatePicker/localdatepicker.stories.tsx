/* eslint-disable react-hooks/rules-of-hooks */
import {LocalDate} from '@js-joda/core';
import {useArgs} from '@storybook/client-api';
import type {Meta, StoryFn} from '@storybook/react';
import debug from 'debug';
import 'react-datepicker/dist/react-datepicker.css';
import {Button} from 'semantic-ui-react';
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

const t: StoryFn<typeof LocalDatePicker> = args => {
	const [, updateArgs] = useArgs();

	return (
		<>
			<LocalDatePicker
				{...args}
				onChange={value => {
					updateArgs({value});
					args.onChange && args.onChange(value);
				}}
			/>
			<div style={{marginTop: '2rem'}}>
				<Button
					onClick={() => {
						updateArgs({startFocused: true});
					}}
				>
					Focus
				</Button>
				<Button
					onClick={() => {
						updateArgs({startSelected: true});
					}}
				>
					Select
				</Button>
				<Button
					onClick={() => {
						updateArgs({startFocused: false, startSelected: false});
					}}
				>
					Reset
				</Button>
			</div>
		</>
	);
};

export const Main: StoryFn<typeof LocalDatePicker> = t.bind({});
Main.args = {
	value: LocalDate.now(),
	startFocused: false,
	startSelected: false,
};

export const Transparent: StoryFn<typeof LocalDatePicker> = t.bind({});
Transparent.args = {
	value: LocalDate.now(),
	transparent: true,
};

export const WithMinMaxDates: StoryFn<typeof LocalDatePicker> = t.bind({});
WithMinMaxDates.args = {
	value: LocalDate.now(),
	minDate: LocalDate.now().minusMonths(2),
	maxDate: LocalDate.now().plusMonths(2),
};

export const WithoutIcon: StoryFn<typeof LocalDatePicker> = t.bind({});
WithoutIcon.args = {
	value: LocalDate.now(),
	hideIcon: true,
};
