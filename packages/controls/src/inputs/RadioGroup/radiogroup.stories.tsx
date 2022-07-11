import {Radio, RadioGroup} from '@mantine/core';
import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
import debug from 'debug';
import {storyDecorator} from '../../storyDecorator';

const d = debug('thx.controls.inputs.RadioGroup.radiogroup.stories');

export default {
	title: 'Inputs/RadioGroup',
	argTypes: {
		value: {type: 'string'},
		onChange: {type: 'function'},
	},
	decorators: [storyDecorator],
} as Meta;

const t: ComponentStory<typeof RadioGroup> = args => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();

	return (
		<RadioGroup
			{...args}
			onChange={value => {
				d(value);
				updateArgs({value});
			}}
		>
			<Radio value="a" label="Choice A" />
			<Radio value="b" label="Choice B" />
		</RadioGroup>
	);
};

export const Main = t.bind({});
Main.args = {
	value: undefined,
};
