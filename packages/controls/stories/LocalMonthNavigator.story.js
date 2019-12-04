import React from 'react';
import {LocalDate} from 'js-joda';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {Container, Form} from 'semantic-ui-react';
import LocalMonthNavigator from '../src/date/LocalMonthNavigator';
import TForm from '../src/form/TForm';

const stories = storiesOf('LocalMonthNavigator', module);

stories.addDecorator(withInfo);

const storyFn = () => (
	<Container>
		<Form width={6}>
			<Form.Field>
				<label>Local Month Navigator</label>
				<TForm
					initialValues={{month: LocalDate.now()}}
					render={props => (
						<LocalMonthNavigator
							name="month"
							maxDate={LocalDate.now().plusMonths(2)}
							minDate={LocalDate.now().minusYears(2).minusMonths(4)}
							value={props.values.month}
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
			text: 'A month navigator with a month dropdown. Returns a localDate.',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
