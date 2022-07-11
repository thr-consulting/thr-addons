/* eslint-disable react-hooks/rules-of-hooks */
import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
import debug from 'debug';
import {storyDecorator} from '../../storyDecorator';
import {MaskedInput} from './MaskedInput';

const d = debug('thx.controls.inputs.MaskedInput.maskedinput.stories');

export default {
	title: 'Inputs/MaskedInput',
	argTypes: {
		value: {control: {type: 'text'}},
		onChange: {type: 'function'},
		disabled: {type: 'boolean'},
		required: {type: 'boolean'},
	},
	decorators: [storyDecorator],
} as Meta;

const t: ComponentStory<typeof MaskedInput> = args => {
	const [, updateArgs] = useArgs();

	return (
		<MaskedInput
			{...args}
			// mask={{mask: args.mask}}
			onChange={value => {
				updateArgs({value});
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
