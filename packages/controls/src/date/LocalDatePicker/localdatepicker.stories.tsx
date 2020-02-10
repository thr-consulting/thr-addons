import debug from 'debug';
import React, {useState} from 'react';
import {Container, Segment} from 'semantic-ui-react';
import {LocalDate} from '@js-joda/core';
import {formatDate} from '@thx/date';
import {LocalDatePicker} from './LocalDatePicker';
import {MaskedDateInput} from './MaskedDateInput';
import 'react-datepicker/dist/react-datepicker.css';
import '../DatePicker/styles.css';

const d = debug('thx.controls.LocalDatePicker.stories');

export default {title: 'LocalDatePicker'};

export const Main = () => {
	const [value, setValue] = useState<LocalDate | null>(LocalDate.now);

	return (
		<Container>
			<Segment basic>
				<LocalDatePicker value={value} onChange={v => setValue(v)} />
			</Segment>
			<Segment>
				<p>Value is: {formatDate(value)}</p>
			</Segment>
		</Container>
	);
};

export const WithMaskedDateInput = () => {
	const [value, setValue] = useState();

	return (
		<Container>
			<Segment basic>
				<MaskedDateInput
					value={value}
					onChange={v => {
						setValue(v.target.value);
					}}
				/>
			</Segment>
		</Container>
	);
};
