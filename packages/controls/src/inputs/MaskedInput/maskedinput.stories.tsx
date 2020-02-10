import debug from 'debug';
import React, {useState} from 'react';
import {Form, Container, Button, Segment, Input} from 'semantic-ui-react';
import {MaskedInput} from './MaskedInput';

const d = debug('thx.controls.MaskedInput.stories');

export default {title: 'MaskedInput'};

export const Main = () => {
	const [shown, setShown] = useState(true);
	const [value, setValue] = useState();
	const [mask, setMask] = useState('99-999-99');
	const [maskTemp, setMaskTemp] = useState('99-999-99');

	if (!shown) {
		return (
			<Container>
				<Button onClick={() => setShown(true)}>Show</Button>
			</Container>
		);
	}

	return (
		<Container>
			<Segment basic>
				<Form>
					<Form.Field inline width={6}>
						<label>Masked Input</label>
						<MaskedInput
							mask={{
								mask,
								autoUnmask: true,
								showMaskOnHover: false,
							}}
							onChange={v => {
								d('onChange', v);
								setValue(v);
							}}
							onBlur={() => {
								d('onBlur');
							}}
							value={value}
						/>
					</Form.Field>
				</Form>
			</Segment>
			<Segment basic>
				<Input
					action={{
						content: 'Set Mask',
						onClick: () => {
							setMask(maskTemp);
						},
					}}
					value={maskTemp}
					onChange={v => setMaskTemp(v.currentTarget.value)}
				/>
			</Segment>
			<Segment basic>
				<Button
					onClick={() => {
						setValue('8811245');
					}}
				>
					Set value
				</Button>
				<Button onClick={() => setShown(false)}>Hide</Button>
			</Segment>
			<Segment>Value is: {value}</Segment>
		</Container>
	);
};
