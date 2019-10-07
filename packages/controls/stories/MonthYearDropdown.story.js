import React from 'react';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {Container, Form} from 'semantic-ui-react';
import MonthYearDropdown from '../src/date/MonthYearDropdown';
import TForm from '../src/form/TForm';

const stories = storiesOf('MonthYearDropdown', module);

stories.addDecorator(withInfo);

const storyFn = () => (
	<Container>
		<Form width={6}>
			<Form.Field>
				<label>Month/Year Picker</label>
				<TForm
					render={props => (
						<MonthYearDropdown
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
			text: 'A year and month picker dropdown. Returns the selected year and month.',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);

const storyNumericFn = () => (
	<Container>
		<Form width={6}>
			<Form.Field>
				<label>Month/Year Picker</label>
				<TForm
					render={props => (
						<MonthYearDropdown
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
	storyNumericFn,
	{
		info: {
			inline: true,
			text: 'A year and month picker dropdown. Returns the selected year and month.',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
