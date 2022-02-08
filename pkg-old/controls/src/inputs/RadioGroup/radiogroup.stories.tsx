import {useArgs} from '@storybook/client-api';
import type {Meta} from '@storybook/react';
import debug from 'debug';
import {Radio} from 'semantic-ui-react';
import {RadioGroup} from './RadioGroup';

const d = debug('thx.controls.inputs.RadioGroup.radiogroup.stories');

export default {
	title: 'Inputs/RadioGroup',
	component: RadioGroup,
	argTypes: {
		value: {type: 'string'},
		onBlur: {type: 'function'},
	},
} as Meta;

export function Main(args) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();

	return (
		<RadioGroup
			{...args}
			onChange={value => {
				updateArgs({value});
				args.onChange && args.onChange(value);
			}}
		>
			<Radio label="Choice A" value="a" />
			<Radio label="Choice B" value="b" />
		</RadioGroup>
	);
}

Main.args = {
	value: undefined,
};

export function WithoutRadioGroup(args) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [, updateArgs] = useArgs();

	const val = args.value;

	return (
		<>
			<p>This shows how you can use the Radio component without the group.</p>
			<Radio
				label="Choice A"
				name="radioGroup"
				value="aa"
				checked={val === 'aa'}
				onChange={(e, {value}) => {
					updateArgs({value});
					args.onChange && args.onChange(value);
				}}
			/>
			<Radio
				label="Choice B"
				name="radioGroup"
				value="bb"
				checked={val === 'bb'}
				onChange={(e, {value}) => {
					updateArgs({value});
					args.onChange && args.onChange(value);
				}}
			/>
		</>
	);
}

WithoutRadioGroup.args = {
	value: undefined,
};
