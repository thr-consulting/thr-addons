import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, boolean, text} from '@storybook/addon-knobs';
import {Container, Form} from 'semantic-ui-react';
import EpochDatePicker from '../src/date/EpochDatePicker';
import {dateInit} from '../src/date/util';
import '../src/date/styles.css';

dateInit();

const stories = storiesOf('EpochDatePicker', module);

stories.addDecorator(withInfo);
stories.addDecorator(withKnobs);

const storyFn = () => (
	<Container>
		<Form width={6}>
			<Form.Field>
				<label>Date/Time Picker</label>
				<EpochDatePicker
					onChange={action('onChange')}
					onSelect={action('onSelect')}
					date={boolean('date', true)}
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
			text: 'A date picker that uses a LocalDate epoch days (integer).',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
