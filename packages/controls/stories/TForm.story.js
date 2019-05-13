/* eslint-disable react/prop-types */
import React from 'react';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {action} from '@storybook/addon-actions';
import {Container, Form, Button} from 'semantic-ui-react';
import TForm from '../src/form/TForm';
import MaskedInput from '../src/inputs/MaskedInput';

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

function renderWarningForm({values, handleChange, handleBlur, handleSubmit, renderWarnings, hasErrors, hasWarnings, fieldError}) {
	return (
		<Form onSubmit={handleSubmit} error={hasErrors()} warning={hasWarnings()}>
			<Form.Field error={fieldError('text')}>
				<label>This must contain text</label>
				<input
					name="text"
					value={values.text}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</Form.Field>
			<Form.Field error={fieldError('moretext')}>
				<label>This must contain more text</label>
				<input
					name="moretext"
					value={values.moretext}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</Form.Field>
			<Form.Button type="submit" onClick={handleSubmit}>Submit</Form.Button>
			{renderWarnings()}
		</Form>
	);
}

function validate(values, props) {
	const warnings = {};
	if (!values.text) warnings.text = 'There is a problem with the text field.';
	if (!values.moretext) warnings.moretext = 'There is a problem with the more text field.';
	return warnings;
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

const warningStoryFn = () => (
	<Container>
		<TForm
			validate={validate}
			render={renderWarningForm}
			loading={false}
			onSubmit={action('onSubmit')}
			initialValues={{text: '', moretext: ''}}
		/>
	</Container>
);

class Outside extends React.Component {
	getSubmitFn = fn => {
		this._formSubmit = fn;
	};

	handleOutsideSubmit = () => {
		this._formSubmit();
	};

	render() {
		return (
			<Container>
				<TForm
					initialValues={{text: ''}}
					render={renderForm}
					onSubmit={action('onSubmit')}
					getSubmitFn={this.getSubmitFn}
				/>
				<Button onClick={this.handleOutsideSubmit}>Outside Submit</Button>
			</Container>
		);
	}
}

const outsideFn = () => (
	<Outside/>
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

const info = {
	inline: true,
	text,
	propTablesExclude: [Form, Form.Field, Container],
};

stories.add(
	'default',
	storyFn,
	{
		info,
	},
);

stories.add(
	'outsideSubmit',
	outsideFn,
	{
		info,
	},
);

stories.add(
	'warnings',
	warningStoryFn,
	{
		info,
	}
);
