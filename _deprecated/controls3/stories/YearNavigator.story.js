import React from 'react';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {Container, Form} from 'semantic-ui-react';
import TForm from '../src/form/TForm';
import YearNavigator from '../src/date/YearNavigator';

const stories = storiesOf('YearNavigator', module);

stories.addDecorator(withInfo);

const storyFn = () => (
	<Container>
		<Form width={6}>
			<Form.Field>
				<label>Year Navigator</label>
				<TForm
					render={props => (
						<YearNavigator
							name="year"
							maxYear="2020"
							minYear={2000}
							value={props.values.year}
							onChange={props.handleChange}
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
			text: 'A year navigator with a year dropdown. Returns the selected year.',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
