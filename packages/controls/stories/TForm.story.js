/* eslint-disable react/prop-types */
import React from 'react';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {action} from '@storybook/addon-actions';
import {Container, Form} from 'semantic-ui-react';
import TForm from '../src/TForm';
import MaskedInput from '../src/MaskedInput';

const stories = storiesOf('TForm', module);

stories.addDecorator(withInfo);

function renderForm({handleChange, handleSubmit, values}) {
	return (
		<Form>
			<Form.Field width={6}>
				<label>Enter some text</label>
				<input name="text" value={values.text} onChange={handleChange}/>
			</Form.Field>
			<Form.Field width={6}>
				<label>Custom input</label>
				<MaskedInput name="masked" value={values.masked} onChange={handleChange('masked')}/>
			</Form.Field>
			<Form.Button onClick={handleSubmit}>Submit</Form.Button>
		</Form>
	);
}

const storyFn = () => (
	<Container>
		<TForm
			initialValues={{text: ''}}
			render={renderForm}
			onSubmit={action('onSubmit')}
		/>
	</Container>
);

const text = `
Extends Formik to provide Semantic UI error and warning messages and field errors. Use TForm exactly like Formik.

This is the render prop function called by TForm:

\`\`\`
function renderForm({handleChange, handleSubmit, values}) {
	return (
		<Form>
			<Form.Field width={6}>
				<label>Enter some text</label>
				<input name="text" value={values.text} onChange={handleChange}/>
			</Form.Field>
			<Form.Button onClick={handleSubmit}>Submit</Form.Button>
		</Form>
	);
}
\`\`\`
`;

stories.add(
	'default',
	storyFn,
	{
		info: {
			inline: true,
			text,
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
