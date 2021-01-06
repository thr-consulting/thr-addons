import debug from 'debug';
import React, {useState} from 'react';
import {Button, Icon, Label, Popup} from 'semantic-ui-react';
import {MaskedInput, MaskedInputProps} from '../MaskedInput';

const d = debug('thx.components.SinInput');

export interface SinInputProps {
	hasSin: boolean;
}

// if we click edit the value is set to an empty string.
// if we click delete the value is set to an empty string.
// if we click cancel the value is set to undefined.
// if we change it we set it to the given string.
export function SinInput(props: SinInputProps & Omit<MaskedInputProps, 'mask' | 'name'>) {
	const {hasSin, onChange, ...rest} = props;
	const [edit, setEdit] = useState(false);
	const [doDelete, setDoDelete] = useState(false);

	function handleChange(val?: string) {
		onChange && onChange(val);
	}

	// if we have a SIN and we don't want to edit
	return hasSin && !edit ? (
		<>
			<Label style={{width: '100%', height: '36px', paddingTop: '10px'}} size="large" color="green">
				SIN is saved
			</Label>
			<Popup
				content="edit"
				trigger={
					<Button
						type="button"
						onClick={() => {
							setEdit(true);
							handleChange('');
						}}
						color="orange"
						icon
					>
						<Icon name="edit" />
					</Button>
				}
			/>
			<Popup
				content="delete"
				trigger={
					<Button
						negative
						type="button"
						icon
						onClick={() => {
							setDoDelete(true);
							handleChange('');
						}}
					>
						<Icon name="trash alternate" />
					</Button>
				}
			/>
		</>
	) : (
		// if we dont have a SIN
		<>
			<MaskedInput {...rest} onChange={handleChange} mask={{mask: '999-999-999', greedy: false, autoUnmask: true}} />
			{/* if we are editing */}
			{edit && (
				<Button
					type="button"
					onClick={() => {
						setEdit(false);
						handleChange(undefined);
					}}
				>
					Cancel
				</Button>
			)}
			{doDelete && (
				<Button
					type="button"
					onClick={() => {
						setDoDelete(false);
						handleChange(undefined);
					}}
				>
					Undo
				</Button>
			)}
		</>
	);
}
