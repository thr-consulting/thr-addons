import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
/* eslint-disable react-hooks/rules-of-hooks */
import debug from 'debug';
import {MonthDayPicker} from './MonthDayPicker';
import {storyDecorator} from '../../storyDecorator';

const d = debug('thx.controls.date.MonthDayPicker.monthdaypicker.stories');

export default {
	title: 'Date/MonthDayPicker',
	argTypes: {
		value: {control: {type: 'text'}},
		onChange: {type: 'function'},
		onChangeRaw: {type: 'function'},
	},
	decorators: [storyDecorator],
} as Meta;

const t: ComponentStory<typeof MonthDayPicker> = args => {
	const [, updateArgs] = useArgs();

	return (
		<MonthDayPicker
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
