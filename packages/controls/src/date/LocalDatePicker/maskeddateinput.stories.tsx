import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
import React from 'react';
import {MaskedDateInput, MaskedDateInputValue} from './MaskedDateInput';

export default {
	title: 'Date/MaskedDateInput',
	argTypes: {
		value: {control: {type: 'text'}},
		onChange: {type: 'function'},
	},
} as Meta;

export const Main: ComponentStory<typeof MaskedDateInput> = ({...args}) => {
	const [, updateArgs] = useArgs();

	return (
		<MaskedDateInput
			{...args}
			onChange={(v: MaskedDateInputValue) => {
				updateArgs({value: v.target.value});
				args.onChange && args.onChange(v);
			}}
		/>
	);
};
Main.args = {
	value: '',
};