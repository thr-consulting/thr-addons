import debug from 'debug';
import React, {useState} from 'react';
import {Container, Segment} from 'semantic-ui-react';
import {DatePicker} from './index';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

const d = debug('thx.controls.DatePicker.stories');

export default {title: 'Date/DatePicker'};

export const WithDatePicker = () => {
	const [value, setValue] = useState<Date | null>(new Date());

	return (
		<Container>
			<Segment basic>
				<DatePicker selected={value} onChange={v => setValue(v)} onBlur={() => d('onBlur')} />
			</Segment>
		</Container>
	);
};
