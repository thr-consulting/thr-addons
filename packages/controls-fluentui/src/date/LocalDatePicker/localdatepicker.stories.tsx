import {Stack, Text, ThemeProvider} from '@fluentui/react';
import {LocalDate} from '@js-joda/core';
import {formatDate} from '@thx/date';
import debug from 'debug';
import React, {useState} from 'react';
import {thrThemeDark} from '../../theme';
import {LocalDatePicker} from './LocalDatePicker';

const d = debug('thx.controls-fluentui.date.LocalDatePicker.localdatepicker.stories');

export default {title: 'Date/LocalDatePicker'};

export const Main = () => {
	const [value, setValue] = useState<LocalDate | null>(LocalDate.now);

	return (
		<ThemeProvider applyTo="body" theme={thrThemeDark}>
			<Stack maxWidth={500}>
				<LocalDatePicker value={value} onChange={v => setValue(v)} />
				<Text>Value is: {formatDate(value)}</Text>
			</Stack>
		</ThemeProvider>
	);
};
