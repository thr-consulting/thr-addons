import React from 'react';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {Container, Form} from 'semantic-ui-react';
import TimeDropdown from '../src/date/TimeDropdown';
import TForm from '../src/form/TForm';

const stories = storiesOf('TimeDropdown', module);

stories.addDecorator(withInfo);

const storyFn = () => (
	<Container>
		<Form width={6}>
			<Form.Field>
				<label>Time Picker</label>
				<TForm
					render={props => (
						<TimeDropdown
							name="time"
							setFieldValue={props.setFieldValue}
							values={props.values.time}
							fieldError={props.fieldError}
							onBlur={props.handleBlur}
						/>
					)}
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
			text: 'A time picker dropdown. Returns the selected time of the day.',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
