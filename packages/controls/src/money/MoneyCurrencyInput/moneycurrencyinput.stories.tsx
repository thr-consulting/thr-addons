import {useArgs} from '@storybook/client-api';
import type {StoryFn, Meta} from '@storybook/react';
import {toMoney} from '@thx/money';
import debug from 'debug';
import Money from 'js-money';
import {MoneyCurrencyInput} from './MoneyCurrencyInput';

const d = debug('thx.controls.money.MoneyCurrencyInput.moneycurrencyinput.stories');

export default {
	title: 'Money/MoneyCurrencyInput',
	component: MoneyCurrencyInput,
} as Meta;

const t: StoryFn<typeof MoneyCurrencyInput> = args => {
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
	value: toMoney(100),
	defaultCurrency: Money.CAD,
	prefix: undefined,
	showPrefix: false,
	locked: false,
	lockCurrency: false,
	wholeNumber: false,
	currencies: [
		{key: 'CAD', text: 'CAD', value: 'CAD'},
		{key: 'USD', text: 'USD', value: 'USD'},
	],
};
