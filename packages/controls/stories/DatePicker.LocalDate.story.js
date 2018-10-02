import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {withState, Store} from '@thx/storybook-state';
import {Container, Form} from 'semantic-ui-react';
import '../src/date/styles.css';
import DatePicker from '../src/date/DatePicker';

const stories = storiesOf('DatePicker.LocalDate', module);

stories.addDecorator(withInfo);
stories.addDecorator(withState);

const storyFn = ({parameters: {state: {store}}}) => ( // eslint-disable-line react/prop-types
	<Container>
		<Form>
			<Form.Field width={6}>
				<label>Select a day</label>
				<DatePicker.LocalDate
					onChange={value => {
						store.set({value});
						action('onChange')(value);
					}}
					value={store.state.value}
					onBlur={action('onBlur')}
					placeholderText="Enter the date"
					onChangeRaw={action('onChangeRaw')}
					todayButton="Today"
				/>
			</Form.Field>
		</Form>
	</Container>
);

stories.add(
	'default',
	storyFn,
	{
		state: {store: new Store({value: null})},
		info: {
			inline: true,
			text: 'A date picker that uses a LocalDate. (react-datepicker style)',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
