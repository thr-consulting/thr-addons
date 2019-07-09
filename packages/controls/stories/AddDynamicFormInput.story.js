import React from 'react';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {withKnobs} from '@storybook/addon-knobs';
import {Container, Form} from 'semantic-ui-react';
import AddDynamicFormInput from '../src/inputs/AddDynamicFormInput';
import TForm from '../src/form/TForm/TForm';

const stories = storiesOf('AddDynamicFormInput', module);

stories.addDecorator(withInfo);
stories.addDecorator(withKnobs);

const storyFn = () => (
	<Container>
		<TForm
			render={({setFieldValue, values, fieldError, handleBlur}) => (
				<AddDynamicFormInput
					name="addDynamicFormInputs"
					label="Name(s) of account holder(s):"
					setFieldValue={setFieldValue}
					values={values.addDynamicFormInputs}
					fieldError={fieldError}
					onBlur={handleBlur}
				>
					<Form.Input name="firstName" label="First Name"/>
					<Form.Input name="lastName" label="Last Name"/>
				</AddDynamicFormInput>
			)}
		/>
	</Container>
);

stories.add(
	'default',
	storyFn,
	{
		info: {
			inline: true,
			text: 'Dynamically adds or removes Form.Inputs',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
