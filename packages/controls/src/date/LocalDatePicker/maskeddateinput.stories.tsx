import {useArgs} from '@storybook/client-api';
import type {Meta} from '@storybook/react';
import {useRef} from 'react';
import {Button} from 'semantic-ui-react';
import {MaskedDateInput, MaskedDateInputRef, MaskedDateInputValue} from './MaskedDateInput';

export default {
	title: 'Date/MaskedDateInput',
	argTypes: {
		value: {control: {type: 'text'}},
		onChange: {type: 'function'},
	},
} as Meta;

export function Main({...args}) {
	const [, updateArgs] = useArgs();

	const ref = useRef<MaskedDateInputRef>(null);

	return (
		<>
			<MaskedDateInput
				{...args}
				ref={ref}
				onChange={(v: MaskedDateInputValue) => {
					updateArgs({value: v.target.value});
					args.onChange && args.onChange(v);
				}}
			/>
			<div style={{marginTop: '2rem'}}>
				<Button
					onClick={() => {
						ref.current.focus();
					}}
				>
					Focus
				</Button>
				<Button
					onClick={() => {
						ref.current.select();
					}}
				>
					Select
				</Button>
			</div>
		</>
	);
}

Main.args = {
	value: '',
};
