import {Button, TextInput} from 'carbon-components-react';
import debug from 'debug';
import React, {useState} from 'react';
import {MaskedInput} from './MaskedInput';

const d = debug('thx.controls-carbon.inputs.MaskedInput.maskedinput.stories');

export default {title: 'Inputs/MaskedInput'};

export const Main = () => {
	const [shown, setShown] = useState(true);
	const [value, setValue] = useState<string | undefined>();
	const [mask, setMask] = useState<string | undefined>('99-999-99');

	if (!shown) {
		return <Button onClick={() => setShown(true)}>Show</Button>;
	}

	return (
		<>
			<MaskedInput
				id="id1"
				labelText="Input"
				mask={{
					mask,
					autoUnmask: true,
					showMaskOnHover: false,
				}}
				value={value}
				onChange={val => {
					d('onChange', val);
					setValue(val);
				}}
			/>
			<TextInput id="id2" labelText="Mask" value={mask} onChange={ev => setMask(ev.currentTarget.value)} />
			<Button
				onClick={() => {
					setValue('8811245');
				}}
			>
				Set value
			</Button>
			<Button onClick={() => setShown(false)}>Hide</Button>
			<p>Value is: {value}</p>
		</>
	);
};
