import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
import debug from 'debug';
import {PhoneInput} from './PhoneInput';

const d = debug('thx.controls.inputs.PhoneInput.phoneinput.stories');

export default {
	title: 'Inputs/PhoneInput',
	component: PhoneInput,
} as Meta;

const t: ComponentStory<typeof PhoneInput> = args => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();

	return (
		<PhoneInput
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
	extension: false,
};
