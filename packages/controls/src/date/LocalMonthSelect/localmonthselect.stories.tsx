import debug from 'debug';
import React, {useState} from 'react';
import {Container, Input, Segment, Form} from 'semantic-ui-react';
import {formatDate} from '@thx/date';
import {LocalMonthSelect} from './LocalMonthSelect';

const d = debug('thx.controls.LocalMonthSelect.stories');

export default {title: 'LocalMonthSelect'};

export const Main = () => {
	const [value, setValue] = useState();
	const [year, setYear] = useState(new Date().getFullYear());

	return (
		<Container>
			<Segment basic>
				<LocalMonthSelect value={value} onChange={v => setValue(v)} year={year} onBlur={() => d('onBlur')} />
				<Form.Field>
					<label>Year:</label>
					<Input value={year} onChange={v => setYear(parseInt(v.target.value || '0', 10))} />{' '}
				</Form.Field>
			</Segment>
			<Segment>
				<p>Month: {formatDate(value)}</p>
			</Segment>
		</Container>
	);
};
