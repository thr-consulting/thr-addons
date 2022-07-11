import {Paper} from '@mantine/core';
import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
import debug from 'debug';
import {storyDecorator} from '../../storyDecorator';
import {SinInput} from './SinInput';

const d = debug('thx.controls.inputs.SinInput.sininput.stories');

export default {
	title: 'Inputs/SinInput',
	argTypes: {
		onChange: {type: 'function'},
		onBlur: {type: 'function'},
		value: {type: 'string'},
	},
	decorators: [
		Story => (
			<>
				<Paper m="1em">Sample: 283 694 685</Paper>
				<Story />
			</>
		),
		storyDecorator,
	],
} as Meta;

const t: ComponentStory<typeof SinInput> = args => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();

	return (
		<SinInput
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
};
