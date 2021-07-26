import {LocalDate} from '@js-joda/core';
import {formatDate} from '@thx/date';
import 'carbon-components/css/carbon-components.css';
import debug from 'debug';
import React, {useState} from 'react';
import {LocalDatePicker} from './LocalDatePicker';

const d = debug('thx.controls-carbon.date.LocalDatePicker.localdatepicker.stories');

export default {title: 'Date/LocalDatePicker'};

export const Main = () => {
	const [value, setValue] = useState<LocalDate | null>(LocalDate.now);

	return (
		<>
			<LocalDatePicker value={value} onChange={v => setValue(v)} />
			<p>Value is: {formatDate(value)}</p>
		</>
	);
};
