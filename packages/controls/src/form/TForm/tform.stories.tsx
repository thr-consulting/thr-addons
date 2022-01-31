import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta} from '@storybook/react';
import debug from 'debug';
import React, {useRef, useState} from 'react';
import {Button, ButtonGroup, Form, Segment} from 'semantic-ui-react';
import {object, string} from 'yup';
import {TForm} from './TForm';
import type {TFormProps} from './types';
import {useTForm} from './useTForm';

const d = debug('thx.controls.form.TForm.tform.stories');

export default {
	title: 'Form/TForm',
	argTypes: {
		onSubmit: {type: 'function'},
		onChange: {type: 'function'},
		onValidate: {type: 'function'},
	},
} as Meta;

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

export const Main: ComponentStory<any> = args => {
	const [, updateArgs] = useArgs();

	return (
		<TForm<FormType>
			{...args}
			initialValues={{text: '', nested: {text: ''}, plainInput: ''}}
			validationSchema={formValidation}
			onSubmit={async (data, helpers) => {
				args.onSubmit(data, helpers);
			}}
		>
			{props => <MyForm {...props} />}
		</TForm>
	);
};
Main.args = {
	enableReinitialize: false,
	loading: false,
};

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

export const WithError: ComponentStory<any> = args => {
	const [, updateArgs] = useArgs();
	const [graphqlError, setGraphqlError] = useState(0);

	return (
		<>
			<TForm<FormType>
				{...args}
				error={sampleGraphqlError[graphqlError]}
				initialValues={{text: '', nested: {text: ''}, plainInput: ''}}
				validationSchema={formValidation}
				onSubmit={data => {
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							if (graphqlError === 0) {
								args.onSubmit(data);
								resolve(data);
							} else {
								updateArgs({error: sampleGraphqlError[graphqlError]});
								reject();
							}
						}, 1000);
					});
				}}
			>
				{props => <MyForm {...props} />}
			</TForm>
			<Segment>
				<ButtonGroup vertical>
					<Button
						color={graphqlError === 0 ? 'green' : 'blue'}
						onClick={() => {
							setGraphqlError(0);
							updateArgs({error: undefined});
						}}
					>
						Clear GraphQL Error
					</Button>
					<Button
						color={graphqlError === 1 ? 'green' : 'blue'}
						onClick={() => {
							setGraphqlError(1);
							updateArgs({error: undefined});
						}}
					>
						Simulate GraphQL Error 1
					</Button>
					<Button
						color={graphqlError === 2 ? 'green' : 'blue'}
						onClick={() => {
							setGraphqlError(2);
							updateArgs({error: undefined});
						}}
					>
						Simulate GraphQL Error 2
					</Button>
				</ButtonGroup>
			</Segment>
		</>
	);
};
WithError.args = {
	...Main.args,
	error: undefined,
};

export const UsingHooks: ComponentStory<any> = args => {
	const [, updateArgs] = useArgs();

	const props = useTForm<FormType>({
		...args,
		initialValues: {
			text: '',
			nested: {
				text: '',
			},
			plainInput: '',
		},
		validationSchema: formValidation,
		onSubmit: data => args.onSubmit(data),
	});

	return <MyForm {...props} />;
};
UsingHooks.args = {
	...Main.args,
};

export const OutsideSubmit: ComponentStory<any> = args => {
	const [, updateArgs] = useArgs();
	const formSubmitFn = useRef<() => Promise<void>>();

	return (
		<>
			<TForm<FormType>
				{...args}
				initialValues={{text: '', nested: {text: ''}, plainInput: ''}}
				validationSchema={formValidation}
				getSubmitFn={sub => (formSubmitFn.current = sub)}
				onSubmit={async (data, formikHelpers) => {
					args.onSubmit(data, formikHelpers);
				}}
			>
				{props => <MyForm {...props} />}
			</TForm>
			<Segment>
				<Button color="orange" onClick={() => formSubmitFn.current && formSubmitFn.current()}>
					Outside Submit
				</Button>
			</Segment>
		</>
	);
};
OutsideSubmit.args = {
	...Main.args,
};
