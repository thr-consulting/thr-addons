import React from 'react';
import {Form, Container} from 'semantic-ui-react';
import {object, string} from 'yup';
import TForm, {TFormRenderProps} from './TForm';
import {FormikProps} from 'formik';

export default {title: 'TForm'};

const validation = object().shape({
	text: string().required('Text is required'),
	blah: object().shape({
		text: string().required('Blah Text is required'),
	}),
});

interface FormValues {
	text: string;
	blah: {
		text: string;
	};
}

function RenderForm({handleChange, values, initialTouched}: FormikProps<FormValues>): JSX.Element {
	console.log(initialTouched);
	return (
		<Form>
			<Form.Field width={6}>
				<label>Enter some text</label>
				<input name="text" value={values.text} onChange={handleChange} />
			</Form.Field>
			<Form.Field width={6}>
				<label>Enter some blah text</label>
				<input name="blah.text" value={values.blah.text} onChange={handleChange} />
			</Form.Field>
			<Form.Button type="submit">Submit</Form.Button>
		</Form>
	);
}

export const withTForm = () => (
	<Container>
		<TForm
			initialValues={{text: '', blah: {text: ''}}}
			validationSchema={validation}
			onSubmit={data => {
				console.log(data);
			}}
			children={RenderForm}
		/>
	</Container>
);
