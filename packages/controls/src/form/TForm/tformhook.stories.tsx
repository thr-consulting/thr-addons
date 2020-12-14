import debug from 'debug';
import React, {useRef, useState} from 'react';
import {Form, Container, Button, ButtonGroup, Segment} from 'semantic-ui-react';
import {object, string} from 'yup';
import {useTForm} from './useTForm';

const d = debug('thx.controls.useTForm.stories');

export default {title: 'useTForm'};

// Yup Validation
const formValidation = object().shape({
	text: string().required('Text is required'),
	nested: object().shape({
		text: string().required('Nested text is required'),
	}),
	plainInput: string(),
	customInput: string(),
});

interface FormValidation {
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

export const Main = () => {
	const [vars, setVars] = useState({
		graphqlError: 0,
	});
	const [graphqlError, setGraphqlError] = useState<ApolloError>();
	const formSubmitFn = useRef<() => Promise<void>>();

	const {
		values,
		handleChange,
		handleBlur,
		handleSubmit,
		renderWarnings,
		formError,
		hasWarnings,
		submitDisabled,
		fieldError,
		isSubmitting,
	} = useTForm<FormValidation>({
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
		</Container>
	);
};
