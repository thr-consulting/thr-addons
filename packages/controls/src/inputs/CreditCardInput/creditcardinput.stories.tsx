import {useArgs} from '@storybook/client-api';
import type {StoryFn, Meta} from '@storybook/react';
import debug from 'debug';
import {CreditCardInput} from './CreditCardInput';

const d = debug('thx.controls.inputs.CreditCardInput.creditcardinput.stories');

export default {
	title: 'Inputs/CreditCardInput',
	component: CreditCardInput,
} as Meta;

const t: StoryFn<typeof CreditCardInput> = args => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();
	// const [data, setData] = useState();

	return (
		<CreditCardInput
			{...args}
			// value={data}
			onChange={value => {
				updateArgs({value});
				// setData(value);
				args.onChange && args.onChange(value);
			}}
		/>
	);
};

export const Main: StoryFn<typeof CreditCardInput> = t.bind({});
Main.args = {
	disabled: false,
	value: {
		number: '',
		cvc: '',
		name: '',
		expiry: undefined,
	},
};
