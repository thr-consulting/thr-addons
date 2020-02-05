import debug from 'debug';
import React, {useRef, useState} from 'react';
import {Form, Container, Button, ButtonGroup, Segment} from 'semantic-ui-react';
import {object, string, InferType} from 'yup';
import TForm from './TForm';
import {TFormChildrenProps} from './TFormInner';

const d = debug('thx.controls.TForm.stories');

export default {title: 'TForm'};

// Yup Validation
const formValidation = object().shape({
	text: string().required('Text is required'),
	nested: object().shape({
		text: string().required('Nested text is required'),
	}),
});

// Infer typescript type from yup validation
type FormValidationType = InferType<typeof formValidation>;

// Basic
function MyForm({
	handleSubmit,
	values,
	handleChange,
	fieldError,
	handleBlur,
	hasWarnings,
	renderWarnings,
	isSubmitting,
	submitDisabled,
	formError,
}: TFormChildrenProps<FormValidationType>) {
	return (
		<Form error={formError} warning={hasWarnings} onSubmit={handleSubmit}>
			<Form.Field width={6} error={fieldError('text')}>
				<label>Enter some text</label>
				<input name="text" value={values.text} onChange={handleChange} onBlur={handleBlur} />
			</Form.Field>
			<Form.Field width={6} error={fieldError('nested')}>
				<label>Enter some nested text</label>
				<input name="nested.text" value={values.nested.text} onChange={handleChange} onBlur={handleBlur} />
			</Form.Field>
			<Form.Button disabled={submitDisabled} type="submit" loading={isSubmitting}>
				Submit
			</Form.Button>
			{renderWarnings()}
		</Form>
	);
}

const sampleGraphqlError = [
	undefined,
	{message: 'Sample Graphql Error 1'},
	{
		message: 'Sample Graphql Error 2',
		graphQLErrors: [{message: 'Graphql Sub Error 2-A'}, {message: 'Graphql Sub Error 2-B'}],
	},
];

export const Main = () => {
	const [vars, setVars] = useState({
		graphqlError: 0,
	});
	const [graphqlError, setGraphqlError] = useState();
	const formSubmitFn = useRef<() => Promise<void>>();

	return (
		<Container>
			<TForm<FormValidationType>
				initialValues={{text: '', nested: {text: ''}}}
				validationSchema={formValidation}
				error={graphqlError}
				getSubmitFn={sub => (formSubmitFn.current = sub)}
				onSubmit={data => {
					return new Promise(resolve => {
						setTimeout(() => {
							if (vars.graphqlError === 0) {
								d('Success!', data);
							}
							setGraphqlError(sampleGraphqlError[vars.graphqlError]);
							resolve();
						}, 1000);
					});
				}}
			>
				{(props: TFormChildrenProps<FormValidationType>) => <MyForm {...props} />}
			</TForm>
			<Segment>
				<ButtonGroup vertical>
					<Button color={vars.graphqlError === 0 ? 'green' : 'blue'} onClick={() => setVars({graphqlError: 0})}>
						Clear GraphQL Error
					</Button>
					<Button color={vars.graphqlError === 1 ? 'green' : 'blue'} onClick={() => setVars({graphqlError: 1})}>
						Simulate GraphQL Error 1
					</Button>
					<Button color={vars.graphqlError === 2 ? 'green' : 'blue'} onClick={() => setVars({graphqlError: 2})}>
						Simulate GraphQL Error 2
					</Button>
					<Button color="orange" onClick={() => formSubmitFn.current && formSubmitFn.current()}>
						Outside Submit
					</Button>
				</ButtonGroup>
			</Segment>
		</Container>
	);
};
