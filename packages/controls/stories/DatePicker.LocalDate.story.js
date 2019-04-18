import React, {useState} from 'react';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {Container, Form, Input} from 'semantic-ui-react';
import DatePicker from '../src/date/DatePicker';
import '../../../node_modules/react-datepicker/dist/react-datepicker.min.css';

const stories = storiesOf('DatePicker.LocalDate', module);

stories.addDecorator(withInfo);

const StoryFn = () => {
	const [value, setValue] = useState(1);
	return (
		<Container>
			<Form>
				<Form.Field width={6}>
					<label>Select a day</label>
					<DatePicker.LocalDate
						onChange={setValue}
						value={value}
						placeholderText="Enter the date"
						todayButton="Today"
					/>
				</Form.Field>
				<Form.Field width={6}>
					<label>Input</label>
					<Input/>
				</Form.Field>
			</Form>
		</Container>
	);
};

stories.add(
	'default',
	() => <StoryFn/>,
	{
		info: {
			inline: true,
			text: 'A date picker that uses a LocalDate. (react-datepicker style)',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
