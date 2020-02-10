import debug from 'debug';
import React, {useState} from 'react';
import {Container, Segment} from 'semantic-ui-react';
import {MonthDayPicker} from './MonthDayPicker';

const d = debug('thx.controls.MonthDayPicker.stories');

export default {title: 'MonthDayPicker'};

export const Main = () => {
	const [value, setValue] = useState();

	return (
		<Container>
			<Segment basic>
				<MonthDayPicker
					value={value}
					onChange={v => {
						d('Changed:', v);
						setValue(v);
					}}
				/>
			</Segment>
		</Container>
	);
};
