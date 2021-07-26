import {Button, Grid, TextField, Typography} from '@material-ui/core';
import debug from 'debug';
import React, {useState} from 'react';
import {MaskedInput} from './MaskedInput';

const d = debug('thx.controls-materialui.inputs.MaskedInput.maskedinput.stories');

export default {title: 'Inputs/MaskedInput'};

export const Main = () => {
	const [shown, setShown] = useState(true);
	const [value, setValue] = useState<string | undefined>();
	const [mask, setMask] = useState<string | undefined>('99-999-99');

	if (!shown) {
		return <Button onClick={() => setShown(true)}>Show</Button>;
	}

	return (
		<Grid container>
			<Grid item xs={12}>
				<MaskedInput
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
			</Grid>
			<Grid item xs={12}>
				<TextField label="Mask" value={mask} onChange={ev => setMask(ev.currentTarget.value)} />
			</Grid>
			<Grid item>
				<Button
					onClick={() => {
						setValue('8811245');
					}}
				>
					Set value
				</Button>
				<Button onClick={() => setShown(false)}>Hide</Button>
				<Typography>Value is: {value}</Typography>
			</Grid>
		</Grid>
	);
};
