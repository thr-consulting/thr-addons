import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
import debug from 'debug';
import {Scriptel} from '../Scriptel';
import {ScriptelInput} from './ScriptelInput';

const d = debug('thx.controls2.inputs.ScriptelInput.scriptelnput.stories');

export default {
	title: 'Inputs/ScriptelInput',
	component: ScriptelInput,
} as Meta;

const t: ComponentStory<typeof ScriptelInput> = args => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();

	return (
		<Scriptel>
			<ScriptelInput
				{...args}
				onChange={value => {
					updateArgs({value});
					args.onChange && args.onChange(value);
				}}
			/>
		</Scriptel>
	);
};

export const Main = t.bind({});
Main.args = {
	value: undefined,
};
