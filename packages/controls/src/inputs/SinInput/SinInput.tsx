import debug from 'debug';
import React, {useState} from 'react';
import {Button, Icon, Label, Popup} from 'semantic-ui-react';
import {MaskedInput, MaskedInputProps} from '../MaskedInput';

const d = debug('thx.components.SinInput');

export interface SinInputProps {
	hasSin: boolean;
}

export function SinInput(props: SinInputProps & Omit<MaskedInputProps, 'mask' | 'name'>) {
	const {hasSin, ...rest} = props;
	const [edit, setEdit] = useState(false);

	return hasSin && !edit ? (
		<>
			<Label style={{width: '100%', height: '36px', paddingTop: '10px'}} size="large" color="green">
				SIN is saved
			</Label>
			<Popup
				content="edit"
				trigger={
					<Button type="button" onClick={() => setEdit(true)} color="orange" icon>
						<Icon name="edit" />
					</Button>
				}
			/>
			<Popup
				content="delete"
				trigger={
					<Button negative type="button" icon onClick={() => setEdit(true)}>
						<Icon name="trash alternate" />
					</Button>
				}
			/>
		</>
	) : (
		<>
			<MaskedInput mask={{mask: '999-999-999', greedy: false, autoUnmask: true}} {...rest} />
			{edit && (
				<Button type="button" onClick={() => setEdit(false)}>
					Cancel
				</Button>
			)}
		</>
	);
}
