import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
/* eslint-disable react-hooks/rules-of-hooks */
import debug from 'debug';
import 'react-datepicker/dist/react-datepicker.css';
import {DatePicker} from './index';
import './styles.css';

const d = debug('thx.controls.date.DatePicker.datepicker.stories');

export default {
	title: 'Date/DatePicker',
	// component: DatePicker,
	argTypes: {
		selected: {
			name: 'selected',
			control: {type: 'date'},
		},
		onBlur: {type: 'function'},
		onChange: {type: 'function'},
	},
} as Meta;

const t: ComponentStory<typeof DatePicker> = ({selected, ...args}) => {
	const [, updateArgs] = useArgs();

	return (
		<DatePicker
			{...args}
			onChange={(sel, ev) => {
				updateArgs({selected: sel});
				args.onChange(sel, ev);
			}}
			selected={selected}
		/>
	);
};

export const Primary = t.bind({});
Primary.args = {
	selected: new Date(),
};
