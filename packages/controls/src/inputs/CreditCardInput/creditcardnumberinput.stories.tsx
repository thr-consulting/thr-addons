import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
import debug from 'debug';
import {CreditCardNumberInput} from './CreditCardNumberInput';
import {storyDecorator} from '../../storyDecorator';

const d = debug('thx.controls.inputs.CreditCardInput.creditcardinput.stories');

export default {
	title: 'Inputs/CreditCardInput',
	argTypes: {
		onChange: {type: 'function'},
		onBlur: {type: 'function'},
		value: {type: 'string'},
	},
	decorators: [storyDecorator],
} as Meta;

const t: ComponentStory<typeof CreditCardNumberInput> = args => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();

	return (
		<CreditCardNumberInput
			{...args}
			onChange={value => {
				updateArgs({value});
			}}
		/>
	);
};

export const CreditCardNumberInputStory: ComponentStory<typeof CreditCardNumberInput> = t.bind({});
CreditCardNumberInputStory.args = {
	value: '',
};
