import {LocalDate} from '@js-joda/core';
import {Typography} from '@material-ui/core';
import {formatDate} from '@thx/date';
import debug from 'debug';
import React, {useState} from 'react';
import {LocalDatePicker} from './LocalDatePicker';

const d = debug('thx.controls-materialui.date.LocalDatePicker.localdatepicker.stories');

export default {title: 'Date/LocalDatePicker'};

export const Main = () => {
	const [value, setValue] = useState<LocalDate | null>(LocalDate.now);

	return (
		<>
			<LocalDatePicker value={value} onChange={v => setValue(v)} />
			<Typography>Value is: {formatDate(value)}</Typography>
		</>
	);
};
