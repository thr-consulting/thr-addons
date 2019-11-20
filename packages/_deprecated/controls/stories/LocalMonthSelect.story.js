import React from 'react';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {Container, Form} from 'semantic-ui-react';
import LocalMonthSelect from '../src/date/LocalMonthSelect';
import TForm from '../src/form/TForm/TForm';

const stories = storiesOf('LocalMonthSelect', module);

stories.addDecorator(withInfo);

const storyFn = () => (
	<Container>
		<TForm
			render={({values, handleChange}) => (
				<LocalMonthSelect
					name="month"
					value={values.month}
					onChange={handleChange}
				/>
			)}
		/>
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
