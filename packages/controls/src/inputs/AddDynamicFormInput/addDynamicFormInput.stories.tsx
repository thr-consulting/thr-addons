import debug from 'debug';
import {object, string, array, InferType} from 'yup';
import React, {useState} from 'react';
import {Form, Container, Segment} from 'semantic-ui-react';
import {AddDynamicFormInput} from './AddDynamicFormInput';
import TForm, {TFormChildrenProps} from '../../form/TForm';

const d = debug('thx.controls.AddDynamicFormInput.stories');

export default {title: 'Add Dynamic FormInput Component'};

const validationSchema = object().shape({
	dynamicInput: array().of(
		object()
			.shape({
				name: string().required('name is required'),
				email: string()
					.email('email is required')
					.required('email is required'),
			})
			.required(),
	),
});

type FormValidationType = InferType<typeof validationSchema>;

export const Main = () => {
	const [values] = useState<FormValidationType>({dynamicInput: [{name: 'test', email: 'test'}]});

	return (
		<Container>
			<Segment basic>
				<TForm onSubmit={() => {}} initialValues={values} validationSchema={validationSchema} validateOnBlur>
					{(tFormProps: TFormChildrenProps<FormValidationType>) => {
						return (
							<Form error={tFormProps.formError} warning={tFormProps.hasWarnings}>
								<Form.Field inline width={6}>
									<label>Dynamic Form Input</label>
									<AddDynamicFormInput<FormValidationType['dynamicInput']>
										name="dynamicInput"
										values={tFormProps.values.dynamicInput}
										setFieldValue={tFormProps.setFieldValue}
										onBlur={tFormProps.handleBlur}
										fieldError={tFormProps.fieldError}
										buttonLabel="Add Inputs"
										columnCount={2}
									>
										<Form.Input name="name" label="Name" />
										<Form.Input name="email" label="Email" />
									</AddDynamicFormInput>
								</Form.Field>
							</Form>
						);
					}}
				</TForm>
			</Segment>
		</Container>
	);
};
