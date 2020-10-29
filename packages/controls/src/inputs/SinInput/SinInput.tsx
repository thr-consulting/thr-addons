import debug from 'debug';
import React, {useState} from 'react';
import {Button, Label} from 'semantic-ui-react';
import {MaskedInput, MaskedInputProps} from '../MaskedInput';

const d = debug('thx.components.SinInput');

export interface SinInputProps {
	hasSin: boolean;
}

export function SinInput(props: SinInputProps & Omit<MaskedInputProps, 'mask'>) {
	const {hasSin, ...rest} = props;
	const [edit, setEdit] = useState(false);

	return hasSin && !edit ? (
		<>
			<Label style={{width: '100%', height: '36px'}} size="large" color="green">
				SIN is saved
			</Label>
			<Button type="button" onClick={() => setEdit(true)}>
				Edit
			</Button>
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
