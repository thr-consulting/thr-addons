import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
import debug from 'debug';
import Money from 'js-money';
import {storyDecorator} from '../../storyDecorator';
import {MoneyCurrencyInput} from './MoneyCurrencyInput';

const d = debug('thx.controls.money.MoneyCurrencyInput.moneycurrencyinput.stories');

export default {
	title: 'Money/MoneyCurrencyInput',
	argTypes: {
		onChange: {type: 'function'},
	},
	decorators: [storyDecorator],
} as Meta;

const t: ComponentStory<typeof MoneyCurrencyInput> = args => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();

	return (
		<MoneyCurrencyInput
			{...args}
			onChange={value => {
				updateArgs({value});
			}}
		/>
	);
};

export const Main = t.bind({});
Main.args = {
	value: {amount: 0, currency: 'CAD'},
	defaultCurrency: Money.CAD,
	prefix: undefined,
	showPrefix: false,
	locked: false,
	wholeNumber: false,
	currencies: [
		{label: 'CAD', value: 'CAD'},
		{label: 'USD', value: 'USD'},
	],
};
