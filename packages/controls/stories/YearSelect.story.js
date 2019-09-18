import React from 'react';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {Container, Form} from 'semantic-ui-react';
import TForm from '../src/form/TForm';
import YearSelect from '../src/date/YearSelect';

const stories = storiesOf('YearSelect', module);

stories.addDecorator(withInfo);

const storyFn = () => (
	<Container>
		<Form width={6}>
			<Form.Field>
				<label>Year Select</label>
				<TForm
					render={props => (
						<YearSelect
							maxYear="2025"
							minYear={2000}
							value={props.values.year}
							onChange={year => props.setFieldValue('year', year)}
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
			text: 'A year select with a year dropdown. Returns the selected year.',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
