import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, boolean, text} from '@storybook/addon-knobs';
import {Container, Form} from 'semantic-ui-react';
import DateTimePicker from '../src/DateTimePicker';
import {dateInit} from '../src/util';
import '../src/styles.css';

dateInit();

const stories = storiesOf('MaskedInput', module);

stories.addDecorator(withInfo);
stories.addDecorator(withKnobs);

const storyFn = () => (
	<Container>
		<Form width={6}>
			<Form.Field>
				<label>Date/Time Picker</label>
				<DateTimePicker
					onChange={action('onChange')}
					onSelect={action('onSelect')}
					date={boolean('date', true)}
					time={boolean('time', true)}
					format={text('format', 'M/d/YYYY')}
					editFormat={text('editFormat', 'M/d/YYYY')}
				/>
			</Form.Field>
		</Form>
	</Container>
);

stories.add(
	'default',
	storyFn,
	{
		info: {
			inline: true,
			text: 'A date/time picker that uses a plain javascript Date.',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
