import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
import debug from 'debug';
import Money from 'js-money';
import {MoneyCurrencyInput} from './MoneyCurrencyInput';

const d = debug('thx.controls.money.MoneyCurrencyInput.moneycurrencyinput.stories');

export default {
	title: 'Money/MoneyCurrencyInput',
	component: MoneyCurrencyInput,
} as Meta;

const t: ComponentStory<typeof MoneyCurrencyInput> = args => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();

	return (
		<MoneyCurrencyInput
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
	value: {amount: 0, currency: 'CAD'},
	defaultCurrency: Money.CAD,
	prefix: undefined,
	showPrefix: false,
	locked: false,
	lockCurrency: true,
	wholeNumber: false,
	currencies: [
		{key: 'CAD', text: 'CAD', value: 'CAD'},
		{key: 'USD', text: 'USD', value: 'USD'},
	],
};
