import debug from 'debug';
import React, {useState} from 'react';
import {Container, Segment} from 'semantic-ui-react';
import {LocalTime} from '@js-joda/core';
import {formatDate} from '@thx/date';
import {LocalTimePicker} from './LocalTimePicker';
import {MaskedTimeInput} from './MaskedTimeInput';
import 'react-datepicker/dist/react-datepicker.css';
import '../DatePicker/styles.css';

const d = debug('thx.controls.LocalTimePicker.stories');

export default {title: 'LocalTimePicker'};

export const Main = () => {
	const [value, setValue] = useState<LocalTime | null>(LocalTime.now);

	return (
		<Container>
			<Segment basic>
				<LocalTimePicker
					value={value}
					onChange={v => {
						d(v);
						setValue(v);
					}}
					onBlur={() => d('onBlur')}
				/>
			</Segment>
			<Segment>
				<p>Value is: {formatDate(value, {time: true, date: false})}</p>
			</Segment>
		</Container>
	);
};

export const WithMaskedDateInput = () => {
	const [value, setValue] = useState();

	return (
		<Container>
			<Segment basic>
				<MaskedTimeInput
					value={value}
					onChange={v => {
						setValue(v.target.value);
					}}
				/>
			</Segment>
		</Container>
	);
};
