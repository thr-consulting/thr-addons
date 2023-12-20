import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
import {toMoney} from '@thx/money';
import debug from 'debug';
import Money from 'js-money';
import {MoneyInput} from './MoneyInput';

const d = debug('thx.controls.money.MoneyInput.moneyinput.stories');

export default {
	title: 'Money/MoneyInput',
	component: MoneyInput,
} as Meta;

const t: ComponentStory<typeof MoneyInput> = args => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();

	return (
		<MoneyInput
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
	value: toMoney(100.12),
	defaultCurrency: Money.CAD,
	prefix: undefined,
	showPrefix: false,
	locked: false,
	wholeNumber: false,
};

export const MoreDecimals = t.bind({});
MoreDecimals.args = {
	...Main.args,
	defaultCurrency: Money.TND,
	showPrefix: true,
};
