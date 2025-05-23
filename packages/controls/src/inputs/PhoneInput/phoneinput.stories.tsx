import {useArgs} from '@storybook/client-api';
import type {StoryFn, Meta} from '@storybook/react';
import debug from 'debug';
import {PhoneInput} from './PhoneInput';

const d = debug('thx.controls.inputs.PhoneInput.phoneinput.stories');

export default {
	title: 'Inputs/PhoneInput',
	component: PhoneInput,
} as Meta;

const t: StoryFn<typeof PhoneInput> = args => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();

	return (
		<PhoneInput
			{...args}
			fluid
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
	extension: false,
};
