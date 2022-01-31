import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
import debug from 'debug';
import React from 'react';
import {MaskedInput} from './MaskedInput';

const d = debug('thx.controls.inputs.MaskedInput.maskedinput.stories');

export default {
	title: 'Inputs/MaskedInput',
	component: MaskedInput,
} as Meta;

const t: ComponentStory<typeof MaskedInput> = args => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();

	return (
		<MaskedInput
			{...args}
			// mask={{mask: args.mask}}
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
	mask: {mask: '99-999-99'},
};

export const AutoUnmask = t.bind({});
AutoUnmask.args = {
	value: '',
	mask: {mask: '99-999-99', autoUnmask: true, showMaskOnHover: false},
};
