import {Button, Group, TextInput} from '@mantine/core';
/* eslint-disable react-hooks/rules-of-hooks */
import {useArgs} from '@storybook/client-api';
import type {Meta} from '@storybook/react';
import debug from 'debug';
import {useState} from 'react';
import {object, string} from 'yup';
import {storyDecorator} from '../../storyDecorator';
import {TForm} from './TForm';
import type {TFormProps} from './types';

const d = debug('thx.controls.form.TForm.tform.stories');

export default {
	title: 'Form/TForm',
	argTypes: {
		onSubmit: {type: 'function'},
		onChange: {type: 'function'},
		onValidate: {type: 'function'},
	},
	decorators: [
		storyDecorator,
		Story => (
			<div style={{width: 400, position: 'relative'}}>
				<Story />
			</div>
		),
	],
} as Meta;

// Yup Validation
const formValidation = object().shape({
	text: string().required('Text is required'),
	nested: object().shape({
		text: string().required('Nested text is required'),
	}),
	plainInput: string(),
});

interface FormType {
	text: string;
	nested: {
		text: string;
	};
	plainInput: string;
}

function MyForm(props: TFormProps<FormType>) {
	const {values, handleChange, handleSubmit, handleBlur, submitDisabled, isSubmitting, renderWarnings} = props;

	// error={formError} warning={hasWarnings}
	return (
		<form onSubmit={handleSubmit}>
			<TextInput name="text" label="Enter some text" value={values.text} onChange={handleChange} onBlur={handleBlur} />
			<TextInput name="nested.text" label="Enter some nested text" value={values.nested.text} onChange={handleChange} onBlur={handleBlur} />
			<TextInput name="plainInput" label="Plain Input" value={values.plainInput} onChange={handleChange} onBlur={handleBlur} />
			<Group position="right" mt="md">
				<Button disabled={submitDisabled} type="submit" loading={isSubmitting}>
					Submit
				</Button>
			</Group>
			{renderWarnings()}
		</form>
	);
}

export function Main(args: any) {
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
}
Main.args = {
	enableReinitialize: false,
	loading: false,
};

/* **************************************************************************** */

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

export function WithError(args: any) {
	// const [, updateArgs] = useArgs();
	const [graphqlError, setGraphqlError] = useState(0);

	return (
		<>
			<div style={{width: 400, position: 'relative'}}>
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
									// updateArgs({error: sampleGraphqlError[graphqlError]});
									reject();
								}
							}, 1000);
						});
					}}
				>
					{props => <MyForm {...props} />}
				</TForm>
			</div>
			<Group position="left" mt="md">
				<Button
					color={graphqlError === 0 ? 'green' : 'blue'}
					onClick={() => {
						setGraphqlError(0);
						// updateArgs({error: undefined});
					}}
				>
					Clear GraphQL Error
				</Button>
				<Button
					color={graphqlError === 1 ? 'green' : 'blue'}
					onClick={() => {
						setGraphqlError(1);
						// updateArgs({error: undefined});
					}}
				>
					Simulate GraphQL Error 1
				</Button>
				<Button
					color={graphqlError === 2 ? 'green' : 'blue'}
					onClick={() => {
						setGraphqlError(2);
						// updateArgs({error: undefined});
					}}
				>
					Simulate GraphQL Error 2
				</Button>
			</Group>
		</>
	);
}
WithError.args = {
	...Main.args,
	error: undefined,
};

// export function UsingHooks(args) {
// 	const [, updateArgs] = useArgs();
//
// 	const props = useTForm<FormType>({
// 		...args,
// 		initialValues: {
// 			text: '',
// 			nested: {
// 				text: '',
// 			},
// 			plainInput: '',
// 		},
// 		validationSchema: formValidation,
// 		onSubmit: data => args.onSubmit(data),
// 	});
//
// 	return <MyForm {...props} />;
// }
//
// UsingHooks.args = {
// 	...Main.args,
// };
//
// export function OutsideSubmit(args) {
// 	const [, updateArgs] = useArgs();
// 	const formSubmitFn = useRef<() => Promise<void>>();
//
// 	return (
// 		<>
// 			<TForm<FormType>
// 				{...args}
// 				initialValues={{text: '', nested: {text: ''}, plainInput: ''}}
// 				validationSchema={formValidation}
// 				getSubmitFn={sub => (formSubmitFn.current = sub)}
// 				onSubmit={async (data, formikHelpers) => {
// 					args.onSubmit(data, formikHelpers);
// 				}}
// 			>
// 				{props => <MyForm {...props} />}
// 			</TForm>
// 			<Segment>
// 				<Button color="orange" onClick={() => formSubmitFn.current && formSubmitFn.current()}>
// 					Outside Submit
// 				</Button>
// 			</Segment>
// 		</>
// 	);
// }
//
// OutsideSubmit.args = {
// 	...Main.args,
// };
