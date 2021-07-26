import {DefaultButton, Stack, ThemeProvider, Text, TextField} from '@fluentui/react';
import debug from 'debug';
import React, {useState} from 'react';
import {thrThemeDark} from '../../theme';
import {MaskedInput} from './MaskedInput';

const d = debug('thx.controls-fluentui.inputs.MaskedInput.maskedinput.stories');

export default {title: 'Inputs/MaskedInput'};

export const Main = () => {
	const [shown, setShown] = useState(true);
	const [value, setValue] = useState<string | undefined>();
	const [mask, setMask] = useState<string | undefined>('99-999-99');

	if (!shown) {
		return (
			<ThemeProvider applyTo="body" theme={thrThemeDark}>
				<Stack>
					<DefaultButton onClick={() => setShown(true)}>Show</DefaultButton>
				</Stack>
			</ThemeProvider>
		);
	}

	return (
		<ThemeProvider applyTo="body" theme={thrThemeDark}>
			<Stack tokens={{childrenGap: 10, maxWidth: 500}}>
				<MaskedInput
					mask={mask}
					value={value}
					onChange={(ev, v) => {
						d('onChange', v);
						setValue(v);
					}}
				/>
				<MaskedInput value={mask} onChange={(ev, v) => setMask(v)} />
				<DefaultButton
					onClick={() => {
						setValue('8811245');
					}}
				>
					Set value
				</DefaultButton>
				<DefaultButton onClick={() => setShown(false)}>Hide</DefaultButton>
				<Text>Value is: {value}</Text>
			</Stack>
		</ThemeProvider>
	);
};
