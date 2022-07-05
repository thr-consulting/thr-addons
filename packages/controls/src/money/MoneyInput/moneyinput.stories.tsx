import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
import debug from 'debug';
import Money from 'js-money';
import {MoneyInput} from './MoneyInput';
import {storyDecorator} from '../../storyDecorator';

const d = debug('thx.controls.money.MoneyInput.moneyinput.stories');

export default {
	title: 'Money/MoneyInput',
	argTypes: {
		onChange: {type: 'function'},
	},
	decorators: [storyDecorator],
} as Meta;

const t: ComponentStory<typeof MoneyInput> = args => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();

	return (
		<MoneyInput
			{...args}
			onChange={value => {
				updateArgs({value});
			}}
		/>
	);
};

export const Main = t.bind({});
Main.args = {
	value: undefined,
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
