import {useArgs} from '@storybook/client-api';
import type {StoryFn, Meta} from '@storybook/react';
import debug from 'debug';
import {SinInput} from './SinInput';

const d = debug('thx.controls.inputs.SinInput.sininput.stories');

export default {
	title: 'Inputs/SinInput',
	argTypes: {
		onChange: {type: 'function'},
		onBlur: {type: 'function'},
		value: {type: 'string'},
	},
} as Meta;

const t: StoryFn<typeof SinInput> = args => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();

	return (
		<SinInput
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
	value: '',
};
