import debug from 'debug';
import React, {useState} from 'react';
import {Container, Segment} from 'semantic-ui-react';
import {Scriptel} from '../Scriptel';
import {ScriptelInput} from './ScriptelInput';

const d = debug('thx.controls.ScriptelInput.stories');

export default {title: 'ScriptelInput'};

export const Main = () => {
	const [value, setValue] = useState();
	const [value2, setValue2] = useState();

	return (
		<Scriptel>
			<Container>
				<Segment basic>
					<ScriptelInput
						value={value}
						onChange={v => {
							d(v);
							setValue(v);
						}}
					/>
				</Segment>
				<Segment basic>
					<ScriptelInput
						value={value2}
						onChange={v => {
							d(v);
							setValue2(v);
						}}
					/>
				</Segment>
			</Container>
		</Scriptel>
	);
};
