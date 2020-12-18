import React, {useEffect, useState} from 'react';
import {FormikValues, useFormik, FormikErrors, FormikTouched} from 'formik';
import flatten from 'flat';
import uniq from 'lodash/uniq';
import get from 'lodash/get';
import {Message, Segment} from 'semantic-ui-react';
import property from 'lodash/property';
import type {TFormConfig} from './types';

export function useTForm<Values extends FormikValues = FormikValues, InitialValues = any>(config: TFormConfig<Values, InitialValues>) {
	const {render, children, ...rest} = config;
	// @ts-ignore
	const formik = useFormik(rest);

	useEffect(() => {
		if (config.onValidate) config.onValidate(formik.isValid);
	}, [formik.isValid, config.onValidate]);

	// Get submit function
	useEffect(() => {
		if (config.getSubmitFn) config.getSubmitFn(formik.submitForm);
	}, [formik.submitForm, config.getSubmitFn]);

	// On change event (if this ends up changing values it will cycle)
	useEffect(() => {
		if (config.onChange) config.onChange(formik.values);
	}, [formik.values]);

	// Mark the error cleared if the form has been edited after an error
	const [errorCleared, setErrorCleared] = useState(false);
	useEffect(() => {
		if (config.error && config.error.message && !formik.isSubmitting) {
			setErrorCleared(true);
		}
	}, [formik.values, config.error]);

	// Flatten the warnings (formik errors) and touch objects.
	const flatWarnings = flatten<FormikErrors<Values>, {[key: string]: string}>(formik.errors);
	const flatTouched = flatten<FormikTouched<Values>, {[key: string]: string}>(formik.touched);

	// Create an array of strings that are warnings (formik errors). If the submit count is greater than 0
	// then it will show all warnings. Otherwise only touched field warnings will be added to this array.
	const warnings: string[] = uniq(
		Object.keys(flatWarnings).reduce<string[]>((memo, value) => {
			const isTouched = flatTouched[value];
			if (isTouched || formik.submitCount > 0) {
				return [...memo, get(flatWarnings, value)];
			}
			return memo;
		}, []),
	);

	// Create an array of strings that are errors (graphql errors).
	let errors: string[] = [];
	let errorHeader = '';
	if (config.error && config.error.message) {
		if (config.error.graphQLErrors) {
			errors = config.error.graphQLErrors.reduce((memo, v) => {
				if (v.message) return [...memo, v.message];
				return memo;
			}, [] as string[]);
		} else {
			const errorMessage = config.error.message.slice(config.error.message.indexOf(': ') + 1);
			errors.push(errorMessage);
		}
		errorHeader = config.error.message.slice(0, config.error.message.indexOf(': '));
	}
	errors = uniq(errors);

	// Check if there are warnings or errors
	const hasWarnings = !(formik.isValid || warnings.length === 0);
	const hasErrors = errors.length > 0;

	// Render the warnings
	function renderWarnings() {
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
	}

	// Returns true if the field has an error
	function fieldError(fieldName: keyof Values | string | number) {
		return (!!property(fieldName)(formik.touched) || formik.submitCount > 0) && !!property(fieldName)(formik.errors);
	}

	// Handles the form submit
	function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
		setErrorCleared(false);
		formik.handleSubmit(e);
	}

	return {
		...formik,
		hasErrors: hasErrors && !errorCleared,
		hasWarnings,
		isValid: !hasWarnings,
		loading: config.loading ? config.loading : false,
		submitDisabled: hasWarnings || formik.isSubmitting,
		errorMarkedCleared: errorCleared,
		formError: hasErrors && !hasWarnings && !errorCleared && !formik.isSubmitting, // Convenience
		renderWarnings,
		fieldError,
		handleSubmit,
	};
}
