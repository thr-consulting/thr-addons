import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {Container, Form} from 'semantic-ui-react';
import LocalMonthSelect from '../src/LocalMonthSelect';

const stories = storiesOf('LocalMonthSelect', module);

stories.addDecorator(withInfo);

const storyFn = () => (
	<Container>
		<Form width={6}>
			<Form.Field>
				<label>Date/Time Picker</label>
				<LocalMonthSelect
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
			text: 'A month picker dropdown that uses a LocalDate. Returns the first of the month as the day, and the current year as default.',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
