import debug from 'debug';
import React, {ChangeEvent, useState, useEffect} from 'react';
import {FormikProps, FormikErrors, FormikTouched} from 'formik';
import {Message, Segment} from 'semantic-ui-react';
import flatten from 'flat';
import get from 'lodash/get';
import uniq from 'lodash/uniq';

const d = debug('thx.controls.TFormInner');

const isFunction = (obj: any): obj is Function => typeof obj === 'function';
const isEmptyChildren = (children: any): boolean => React.Children.count(children) === 0;

export interface TFormChildrenProps<Values> extends FormikProps<Values> {
	renderWarnings: () => JSX.Element; // Returns a Message component displaying warnings and errors.
	hasErrors: boolean; // True if errors have been passed from parent but has not been marked as cleared
	hasWarnings: boolean; // True if form validation warnings occur
	fieldError: (fieldName: keyof Values) => boolean;
	loading?: boolean; // We just pass this variable from parent to child
	errorMarkedCleared: boolean; // Errors have been marked as cleared
	submitDisabled: boolean; // Semantic UI Convenience variable
	formError: boolean; // Semantic UI Convenience variable
}

// I don't want install the apollo package here, so this is the general type for error:
interface ApolloError {
	message?: string;
	graphQLErrors?: {
		message?: string;
	}[];
}

export interface TFormProps<Values> {
	children?: ((props: TFormChildrenProps<Values>) => React.ReactNode) | React.ReactNode;
	numFields?: number;
	loading?: boolean;
	error?: ApolloError; // Graphql errors
	onValidate?: (isValid: boolean) => void;
	getSubmitFn?: (submitFormFn: () => Promise<void> | Promise<any>) => void;
	onChange?: (values: Values) => void;
}

export interface TFormInnerProps<Values> {
	formikProps: FormikProps<Values>;
	tFormProps: TFormProps<Values>;
	children?: ((props: TFormChildrenProps<Values>) => React.ReactNode) | React.ReactNode;
}

export function TFormInner<Values>(props: TFormInnerProps<Values>): JSX.Element | null {
	const {children, formikProps, tFormProps} = props;

	useEffect(() => {
		if (tFormProps.onValidate) tFormProps.onValidate(formikProps.isValid);
	}, [formikProps.isValid, tFormProps.onValidate]);

	// Get submit function
	useEffect(() => {
		if (tFormProps.getSubmitFn) tFormProps.getSubmitFn(formikProps.submitForm);
	}, [formikProps.submitForm, tFormProps.getSubmitFn]);

	// On change event (if this ends up changing values it will cycle)
	useEffect(() => {
		if (tFormProps.onChange) tFormProps.onChange(formikProps.values);
	}, [formikProps.values]);

	// Mark the error cleared if the form has been edited after an error
	const [errorCleared, setErrorCleared] = useState(false);
	useEffect(() => {
		if (tFormProps.error && tFormProps.error.message && !formikProps.isSubmitting) {
			setErrorCleared(true);
		}
	}, [formikProps.values, tFormProps.error]);

	// Flatten the warnings (formik errors) and touch objects.
	const flatWarnings = flatten<FormikErrors<Values>, {[key: string]: string}>(formikProps.errors);
	const flatTouched = flatten<FormikTouched<Values>, {[key: string]: string}>(formikProps.touched);

	// Create an array of strings that are the warnings (formik errors). If the submit count is greater than 0
	// then it will show all warnings. Otherwise only touched field warnings will be added to this array.
	const warnings: string[] = uniq(
		Object.keys(flatWarnings).reduce<string[]>((memo, value) => {
			const isTouched = flatTouched[value];
			if (isTouched || formikProps.submitCount > 0) {
				return [...memo, get(flatWarnings, value)];
			}
			return memo;
		}, []),
	);

	let errors: string[] = [];
	let errorHeader = '';
	if (tFormProps.error && tFormProps.error.message) {
		if (tFormProps.error.graphQLErrors) {
			errors = tFormProps.error.graphQLErrors.reduce((memo, v) => {
				if (v.message) return [...memo, v.message];
				return memo;
			}, [] as string[]);
		} else {
			const errorMessage = tFormProps.error.message.slice(tFormProps.error.message.indexOf(': ') + 1);
			errors.push(errorMessage);
		}
		errorHeader = tFormProps.error.message.slice(0, tFormProps.error.message.indexOf(': '));
	}
	errors = uniq(errors);

	const hasWarnings = !(formikProps.isValid || warnings.length === 0);
	const hasErrors = errors.length > 0;

	const bag: TFormChildrenProps<Values> = {
		...formikProps,
		renderWarnings() {
			if (!hasWarnings && !hasErrors) return null;
			return (
				<Message warning={hasWarnings} error={hasErrors && !hasWarnings}>
					<Message.Header>{hasWarnings ? 'Some fields are not complete:' : `${errorHeader}:`}</Message.Header>
					{/* Put it in a segment to make sure the errorMessage isn't too big when there are a lot of errors */}
					<Segment style={{overflow: 'auto', maxHeight: 100}}>
						{(hasWarnings ? warnings : errors).map(msg => (
							<div key={msg}>{msg}</div>
						))}
					</Segment>
				</Message>
			);
		},
		fieldError(fieldName) {
			return (formikProps.touched[fieldName] || formikProps.submitCount > 0) && !!formikProps.errors[fieldName];
		},
		handleChange(ev: ChangeEvent | string) {
			if (typeof ev === 'string') {
				d(ev);
				return (val: any) => {
					d(ev, val);
					formikProps.setFieldValue(ev, val);
				};
			}
			if (ev.nativeEvent) return formikProps.handleChange(ev);
			throw new Error('TForm expects handleChange to receive a SyntheticEvent or a string value of the field name');
		},
		handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
			setErrorCleared(false);
			formikProps.handleSubmit(e);
		},
		hasErrors: hasErrors && !errorCleared,
		hasWarnings,
		isValid: !hasWarnings,
		loading: tFormProps.loading,
		submitDisabled: hasWarnings || formikProps.isSubmitting,
		formError: hasErrors && !hasWarnings && !errorCleared && !formikProps.isSubmitting, // Convenience
		errorMarkedCleared: errorCleared,
	};

	if (children) {
		if (isFunction(children)) {
			return (children as (bag: TFormChildrenProps<Values>) => JSX.Element)(bag);
		}
		if (!isEmptyChildren(children)) {
			// @ts-ignore
			return React.Children.only(children);
		}
		return null;
	}
	return null;
}
