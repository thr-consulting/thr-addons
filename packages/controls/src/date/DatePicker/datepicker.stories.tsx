import debug from 'debug';
import React, {useState} from 'react';
import {Provider, Segment, themes} from '@fluentui/react-northstar';
import {DatePicker} from './index';
import 'react-datepicker/dist/react-datepicker.css';

const d = debug('thx.controls.DatePicker.stories');

export default {title: 'DatePicker'};

export const WithDatePicker = () => {
	const [value, setValue] = useState<Date | null>(new Date());

	return (
		<Provider theme={themes.teams}>
			<Segment>
				<DatePicker selected={value} onChange={(v) => setValue(v)} onBlur={() => d('onBlur')} />
			</Segment>
		</Provider>
	);
};
