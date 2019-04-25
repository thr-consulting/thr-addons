import React, {useState} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {Container, Form} from 'semantic-ui-react';
import '../src/date/DatePicker/styles.css';
import DatePicker from '../src/date/DatePicker';

const stories = storiesOf('DatePicker', module);

stories.addDecorator(withInfo);

const StoryFn = () => {
	const [value, setValue] = useState();

	return (
		<Container>
			<Form>
				<Form.Field width={6}>
					<label>Select a day</label>
					<DatePicker
						onChange={a => {
							setValue(a);
						}}
						selected={value}
						onBlur={action('onBlur')}
						placeholderText="Enter the date"
						todayButton="Today"
					/>
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
			text: 'A date picker that uses a Moment. (react-datepicker style)',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
