import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
import debug from 'debug';
import {PhoneInput} from './PhoneInput';
import {storyDecorator} from '../../storyDecorator';

const d = debug('thx.controls.inputs.PhoneInput.phoneinput.stories');

export default {
	title: 'Inputs/PhoneInput',
	argTypes: {
		value: {control: {type: 'text'}},
		onChange: {type: 'function'},
		disabled: {type: 'boolean'},
		required: {type: 'boolean'},
	},
	decorators: [storyDecorator],
} as Meta;

const t: ComponentStory<typeof PhoneInput> = args => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();

	return (
		<PhoneInput
			{...args}
			onChange={value => {
				updateArgs({value});
			}}
		/>
	);
};

export const Main = t.bind({});
Main.args = {
	value: '',
	extension: false,
};
