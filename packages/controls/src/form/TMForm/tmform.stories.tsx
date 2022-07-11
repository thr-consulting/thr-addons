/* eslint-disable react-hooks/rules-of-hooks */
import {Button, Group, TextInput} from '@mantine/core';
import {useForm, yupResolver} from '@mantine/form';
import type {Meta} from '@storybook/react';
import {GraphQLError} from 'graphql';
import {useState} from 'react';
import {ApolloError} from '@apollo/client';
import debug from 'debug';
import {object, string} from 'yup';
import {storyDecorator} from '../../storyDecorator';
import {TMForm} from './TMForm';

const d = debug('thx.controls.inputs.TMForm.stories');

export default {
	title: 'TMForm/Basic',
	argTypes: {
		onSubmit: {type: 'function'},
		onChange: {type: 'function'},
	},
	decorators: [storyDecorator],
} as Meta;

// Yup Validation
const addressFormSchema = object().shape({
	line1: string().required(),
	line2: string().notRequired(),
});

const sampleErrors = [
	() => undefined,
	() => new Error('Sample Error #1'),
	() =>
		new ApolloError({
			graphQLErrors: [new GraphQLError('Sample Graphql Error #2')],
			errorMessage: 'Error in Graphql',
		}),
	() =>
		new ApolloError({
			graphQLErrors: [new GraphQLError('Sample Graphql Error #3'), new GraphQLError('Sample Graphql Error #4')],
			errorMessage: 'Error in Graphql',
		}),
];

export function Main() {
	const [errorIndex, setErrorIndex] = useState(0);

	const form = useForm({
		initialValues: {line1: '', line2: ''},
		validate: yupResolver(addressFormSchema),
	});

	return (
		<>
			<div style={{width: 400, position: 'relative'}}>
				<TMForm
					form={form}
					onSubmit={values => {
						if (errorIndex !== 0) {
							throw sampleErrors[errorIndex]() as Error;
						}
						d(values);
					}}
				>
					<TextInput required label="Line 1" {...form.getInputProps('line1')} />
					<TextInput label="Line 2" {...form.getInputProps('line2')} />
					<Group position="right" mt="md">
						<Button type="submit">Submit</Button>
					</Group>
				</TMForm>
			</div>
			<Group mt="xl">
				<Button color={errorIndex === 0 ? 'green' : 'blue'} onClick={() => setErrorIndex(0)}>
					Clear GraphQL Error
				</Button>
				<Button color={errorIndex === 1 ? 'green' : 'blue'} onClick={() => setErrorIndex(1)}>
					Simulate Error 1
				</Button>
				<Button color={errorIndex === 2 ? 'green' : 'blue'} onClick={() => setErrorIndex(2)}>
					Simulate Error 2
				</Button>
				<Button color={errorIndex === 3 ? 'green' : 'blue'} onClick={() => setErrorIndex(3)}>
					Simulate Error 3
				</Button>
			</Group>
		</>
	);
}
Main.args = {};

export function SubmitPromises() {
	// const [, updateArgs] = useArgs();
	const [errorIndex, setErrorIndex] = useState(0);

	const form = useForm({
		initialValues: {line1: '', line2: ''},
		validate: yupResolver(addressFormSchema),
	});

	return (
		<>
			<div style={{width: 400, position: 'relative'}}>
				<TMForm
					form={form}
					onSubmit={values => {
						return new Promise((resolve, reject) => {
							setTimeout(() => {
								if (errorIndex === 0) {
									d(values);
									resolve();
								} else {
									reject(sampleErrors[errorIndex]());
								}
							}, 1500);
						});
					}}
				>
					<TextInput required label="Line 1" {...form.getInputProps('line1')} />
					<TextInput label="Line 2" {...form.getInputProps('line2')} />
					<Group position="right" mt="md">
						<Button type="submit">Submit</Button>
					</Group>
				</TMForm>
			</div>
			<Group mt="xl">
				<Button color={errorIndex === 0 ? 'green' : 'blue'} onClick={() => setErrorIndex(0)}>
					Clear GraphQL Error
				</Button>
				<Button color={errorIndex === 1 ? 'green' : 'blue'} onClick={() => setErrorIndex(1)}>
					Simulate Error 1
				</Button>
				<Button color={errorIndex === 2 ? 'green' : 'blue'} onClick={() => setErrorIndex(2)}>
					Simulate Error 2
				</Button>
				<Button color={errorIndex === 3 ? 'green' : 'blue'} onClick={() => setErrorIndex(3)}>
					Simulate Error 3
				</Button>
			</Group>
		</>
	);
}
SubmitPromises.args = {};
