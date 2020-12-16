import debug from 'debug';
import React, {useRef, useState} from 'react';
import {Form, Container, Button, ButtonGroup, Segment} from 'semantic-ui-react';
import {object, string} from 'yup';
import {Field} from 'formik';
import {TForm} from './TForm';
import {useTForm} from './useTForm';
import type {TFormProps} from './types';

const d = debug('thx.controls.TForm.stories');

export default {title: 'TForm'};

// Yup Validation
const formValidation = object().shape({
	text: string().required('Text is required'),
	nested: object().shape({
		text: string().required('Nested text is required'),
	}),
	plainInput: string(),
	customInput: string(),
});

interface FormType {
	text: string;
	nested: {
		text: string;
	};
	plainInput: string;
}

interface ApolloError {
	message?: string;
	graphQLErrors?: {
		message?: string;
	}[];
}

const sampleGraphqlError: (ApolloError | undefined)[] = [
	undefined,
	{message: 'Sample Graphql Error 1'},
	{
		message: 'Sample Graphql Error 2',
		graphQLErrors: [{message: 'Graphql Sub Error 2-A'}, {message: 'Graphql Sub Error 2-B'}],
	},
];

function MyForm(props: TFormProps<FormType>) {
	const {values, handleChange, handleSubmit, handleBlur, hasWarnings, fieldError, formError, submitDisabled, isSubmitting, renderWarnings} = props;

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
			<Form.Field error={fieldError('plainInput')}>
				<label>Plain input</label>
				<input name="plainInput" value={values.plainInput} onChange={handleChange} onBlur={handleBlur} />
			</Form.Field>
			<Form.Button disabled={submitDisabled} type="submit" loading={isSubmitting}>
				Submit
			</Form.Button>
			{renderWarnings()}
		</Form>
	);
}

function MyFootSegment({vars, setVars, setGraphqlError, formSubmitFn}: any) {
	return (
		<Segment>
			<ButtonGroup vertical>
				<Button
					color={vars.graphqlError === 0 ? 'green' : 'blue'}
					onClick={() => {
						setVars({graphqlError: 0});
						setGraphqlError(undefined);
					}}
				>
					Clear GraphQL Error
				</Button>
				<Button
					color={vars.graphqlError === 1 ? 'green' : 'blue'}
					onClick={() => {
						setVars({graphqlError: 1});
						setGraphqlError(undefined);
					}}
				>
					Simulate GraphQL Error 1
				</Button>
				<Button
					color={vars.graphqlError === 2 ? 'green' : 'blue'}
					onClick={() => {
						setVars({graphqlError: 2});
						setGraphqlError(undefined);
					}}
				>
					Simulate GraphQL Error 2
				</Button>
				<Button color="orange" onClick={() => formSubmitFn.current && formSubmitFn.current()}>
					Outside Submit
				</Button>
			</ButtonGroup>
		</Segment>
	);
}

export const Main = () => {
	const [vars, setVars] = useState({
		graphqlError: 0,
	});
	const [graphqlError, setGraphqlError] = useState<ApolloError>();
	const formSubmitFn = useRef<() => Promise<void>>();

	return (
		<Container>
			<TForm<FormType>
				initialValues={{text: '', nested: {text: ''}, plainInput: ''}}
				validationSchema={formValidation}
				error={graphqlError}
				getSubmitFn={sub => (formSubmitFn.current = sub)}
				onSubmit={data =>
					new Promise((resolve, reject) => {
						setTimeout(() => {
							if (vars.graphqlError === 0) {
								d('Success!', data);
								resolve(data);
							} else {
								setGraphqlError(sampleGraphqlError[vars.graphqlError]);
								reject();
							}
						}, 1000);
					})
				}
			>
				{props => <MyForm {...props} />}
			</TForm>
			<MyFootSegment vars={vars} formSubmitFn={formSubmitFn} setGraphqlError={setGraphqlError} setVars={setVars} />
		</Container>
	);
};

export const UseHooks = () => {
	const [vars, setVars] = useState({
		graphqlError: 0,
	});
	const [graphqlError, setGraphqlError] = useState<ApolloError>();
	const formSubmitFn = useRef<() => Promise<void>>();

	const props = useTForm<FormType>({
		initialValues: {
			text: '',
			nested: {
				text: '',
			},
			plainInput: '',
		},
		validationSchema: formValidation,
		error: graphqlError,
		getSubmitFn: sub => (formSubmitFn.current = sub),
		onSubmit: data =>
			new Promise((resolve, reject) => {
				setTimeout(() => {
					if (vars.graphqlError === 0) {
						d('Success!', data);
						resolve(data);
					} else {
						setGraphqlError(sampleGraphqlError[vars.graphqlError]);
						reject();
					}
				}, 1000);
			}),
	});

	return (
		<Container>
			<MyForm {...props} />
			<MyFootSegment vars={vars} formSubmitFn={formSubmitFn} setGraphqlError={setGraphqlError} setVars={setVars} />
		</Container>
	);
};

export const UsingField = () => {
	const [vars, setVars] = useState({
		graphqlError: 0,
	});
	const [graphqlError, setGraphqlError] = useState<ApolloError>();
	const formSubmitFn = useRef<() => Promise<void>>();

	return (
		<Container>
			<TForm<FormType>
				initialValues={{text: '', nested: {text: ''}, plainInput: ''}}
				validationSchema={formValidation}
				error={graphqlError}
				getSubmitFn={sub => (formSubmitFn.current = sub)}
				onSubmit={data =>
					new Promise((resolve, reject) => {
						setTimeout(() => {
							if (vars.graphqlError === 0) {
								d('Success!', data);
								resolve(data);
							} else {
								setGraphqlError(sampleGraphqlError[vars.graphqlError]);
								reject();
							}
						}, 1000);
					})
				}
			>
				{props => {
					const {handleSubmit, hasWarnings, formError, submitDisabled, isSubmitting, renderWarnings} = props;
					return (
						<Form error={formError} warning={hasWarnings} onSubmit={handleSubmit}>
							<Field as={Form.Field} name="text" />
							<Form.Button disabled={submitDisabled} type="submit" loading={isSubmitting}>
								Submit
							</Form.Button>
							{renderWarnings()}
						</Form>
					);
				}}
			</TForm>
			<MyFootSegment vars={vars} formSubmitFn={formSubmitFn} setGraphqlError={setGraphqlError} setVars={setVars} />
		</Container>
	);
};
