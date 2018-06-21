import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {Container, Form} from 'semantic-ui-react';
import MonthSelect from '../src/MonthSelect';

const stories = storiesOf('MonthSelect', module);

stories.addDecorator(withInfo);

const storyFn = () => (
	<Container>
		<Form width={6}>
			<Form.Field>
				<label>Date/Time Picker</label>
				<MonthSelect
					onChange={action('onChange')}
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
			text: 'A month picker dropdown that uses a plain javascript Date. Returns the first of the month as the day, and the current year as default.',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
