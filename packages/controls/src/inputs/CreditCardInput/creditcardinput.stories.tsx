import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
import debug from 'debug';
import {CreditCardInput} from './CreditCardInput';
import {storyDecorator} from '../../storyDecorator';

const d = debug('thx.controls.inputs.CreditCardInput.creditcardinput.stories');

export default {
	title: 'Inputs/CreditCardInput',
	decorators: [
		storyDecorator,
		Story => (
			<div style={{width: '500px', position: 'relative', border: '0px solid green'}}>
				<Story />
			</div>
		),
	],
} as Meta;

const t: ComponentStory<typeof CreditCardInput> = args => {
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

export const Main: ComponentStory<typeof CreditCardInput> = t.bind({});
Main.args = {
	disabled: false,
	showCard: false,
	value: {
		number: '',
		cvc: '',
		name: '',
		expiry: undefined,
	},
};
