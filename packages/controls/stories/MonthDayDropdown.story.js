import React from 'react';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {Container, Form} from 'semantic-ui-react';
import MonthDayDropdown from '../src/date/MonthDayDropdown';
import TForm from '../src/form/TForm';

const stories = storiesOf('MonthDayPicker', module);

stories.addDecorator(withInfo);

const storyFn = () => (
	<Container>
		<Form width={6}>
			<Form.Field>
				<label>Month/DayPicker</label>
				<TForm
					render={props => (
						<MonthDayDropdown
							setFieldValue={props.setFieldValue}
							value={props.values.date}
							name="date"
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
			text: 'A month and day picker dropdown. Returns the selected month and day.',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);

const numericFn = () => (
	<Container>
		<Form width={6}>
			<Form.Field>
				<label>Month/DayPicker</label>
				<TForm
					render={props => (
						<MonthDayDropdown
							setFieldValue={props.setFieldValue}
							value={props.values.date}
							name="date"
							numeric
						/>
					)}
				/>
			</Form.Field>
		</Form>
	</Container>
);

stories.add(
	'numeric',
	numericFn,
	{
		info: {
			inline: true,
			text: 'A month and day picker dropdown. Returns the selected month and day.',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
