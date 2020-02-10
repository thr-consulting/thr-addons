import debug from 'debug';
import React, {useState} from 'react';
import {Container, Segment} from 'semantic-ui-react';
import {MonthYearPicker} from './MonthYearPicker';

const d = debug('thx.controls.MonthYearPicker.stories');

export default {title: 'MonthYearPicker'};

export const Main = () => {
	const [value, setValue] = useState();

	return (
		<Container>
			<Segment basic>
				<MonthYearPicker
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
