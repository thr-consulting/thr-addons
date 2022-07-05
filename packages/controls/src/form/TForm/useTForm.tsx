import flatten from 'flat';
import {FormikValues, useFormik, FormikErrors, FormikTouched} from 'formik';
import {Alert} from '@mantine/core';
import {AlertCircle} from 'tabler-icons-react';
import {get, property, uniq} from 'lodash-es';
import {FormEvent, useEffect, useState} from 'react';
import type {TFormConfig} from './types';

export function useTForm<Values extends FormikValues = FormikValues, InitialValues = any>(config: TFormConfig<Values, InitialValues>) {
	const {render, children, ...rest} = config;
	// @ts-ignore
	const formik = useFormik(rest);

	useEffect(() => {
		if (config.onValidate) config.onValidate(formik.isValid);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.isValid, config.onValidate]);

	// Get submit function
	useEffect(() => {
		if (config.getSubmitFn) config.getSubmitFn(formik.submitForm);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.submitForm, config.getSubmitFn]);

	// On change event (if this ends up changing values it will cycle)
	useEffect(() => {
		if (config.onChange) config.onChange(formik.values);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values]);

	// Mark the error cleared if the form has been edited after an error
	const [errorCleared, setErrorCleared] = useState(false);
	useEffect(() => {
		if (config.error && config.error.message && !formik.isSubmitting) {
			setErrorCleared(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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

	const formError = hasErrors && !hasWarnings && !errorCleared && !formik.isSubmitting;

	// Render the warnings
	function renderWarnings() {
		if (!hasWarnings && !hasErrors) return null;
		return (
			<Alert
				icon={<AlertCircle size={16} />}
				title={hasWarnings ? 'Some fields are not complete:' : `${errorHeader}:`}
				my="1em"
				color={hasErrors ? 'red' : 'yellow'}
			>
				{(hasWarnings ? warnings : errors).map(msg => (
					<div key={msg}>{msg}</div>
				))}
			</Alert>
		);
	}

	// Returns true if the field has an error
	function fieldError(fieldName: keyof Values | string | number) {
		return (!!property(fieldName)(formik.touched) || formik.submitCount > 0) && !!property(fieldName)(formik.errors);
	}

	// Handles the form submit
	function handleSubmit(e?: FormEvent<HTMLFormElement>) {
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
		formError, // Convenience
		renderWarnings,
		fieldError,
		handleSubmit,
	};
}
