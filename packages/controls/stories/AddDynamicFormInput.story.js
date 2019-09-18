import React from 'react';
import debug from 'debug';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {withKnobs} from '@storybook/addon-knobs';
import {Container, Form} from 'semantic-ui-react';
import AddDynamicFormInput from '../src/inputs/AddDynamicFormInput';
import TForm from '../src/form/TForm/TForm';
import {DatePicker, YearSelect} from '../src';

const d = debug('thx.packages.controls.stories.AddDynamicFormInput');

const stories = storiesOf('AddDynamicFormInput', module);

stories.addDecorator(withInfo);
stories.addDecorator(withKnobs);

const storyFn = () => (
	<Container>
		<TForm
			render={({setFieldValue, values, fieldError, handleBlur}) => (
				<AddDynamicFormInput
					name="addDynamicFormInputs"
					buttonLabel="Add Name(s) of account holder(s):"
					setFieldValue={setFieldValue}
					values={values.addDynamicFormInputs}
					fieldError={fieldError}
					handleBlur={handleBlur}
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

const testFn = () => (
	<Container>
		<TForm
			render={({setFieldValue, values, fieldError, handleBlur}) => (
				<AddDynamicFormInput
					name="dynamic"
					buttonLabel="Add Member"
					values={values.dynamic}
					fieldError={fieldError}
					handleBlur={handleBlur}
					setFieldValue={setFieldValue}
				>
					<Form.Input
						label="Name"
						name="firstName"
						placeholder="Name"
					/>
					<Form.Input
						name="address"
						placeholder="Address"
						label="Address"
					/>
					<Form.Input
						name="office"
						label="Office"
						placeholder="Office"
					/>
					<Form.Input label="Year" name="date">
						<YearSelect name="date" placeholder="2019"/>
					</Form.Input>
					<Form.Input label="Date">
						<DatePicker.LocalDate
							name="stepsDown"
							placeholderText="Enter the date"
							todayButton="Today"
						/>
					</Form.Input>
				</AddDynamicFormInput>
			)}
		/>
	</Container>
);

stories.add(
	'with nested children',
	testFn,
	{
		info: {
			inline: true,
			text: 'Dynamically adds or removes Form.Inputs',
			propTablesExclude: [Form, Form.Field, Container],
		},
	},
);
