/* eslint-disable react/prop-types */
import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Grid, Form} from 'semantic-ui-react';
import TForm from '../src/TForm';

function renderForm({handleChange, handleSubmit, values}) {
	return (
		<Form>
			<Form.Field>
				<label>Money</label>
				<input name="text" value={values.text} onChange={handleChange}/>
			</Form.Field>
			<Form.Button onClick={handleSubmit}>Submit</Form.Button>
		</Form>
	);
}

const stories = storiesOf('TForm', module);

stories.add('default', () => (
	<Grid>
		<Grid.Row>
			<Grid.Column width={4}>
				<TForm
					initialValues={{text: 'fdafa'}}
					render={renderForm}
					onSubmit={action('onSubmit')}
				/>
			</Grid.Column>
		</Grid.Row>
	</Grid>
));
