import type {FormikConfig, FormikProps} from 'formik';
import type React from 'react';

export interface TFormProps<Values> extends FormikProps<Values> {
	hasErrors: boolean;
	hasWarnings: boolean;
	isValid: boolean;
	loading: boolean;
	submitDisabled: boolean;
	errorMarkedCleared: boolean;
	formError: boolean;
	renderWarnings: () => JSX.Element | null;
	fieldError: (fieldName: keyof Values | string | number) => boolean;
	handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
}

// I don't want install the apollo package here, so this is the general type for error:
interface ApolloError {
	message?: string;
	graphQLErrors?: {
		message?: string;
	}[];
}

export interface TFormConfig<Values, InitialValues = any> extends Omit<FormikConfig<Values>, 'component' | 'render' | 'children' | 'initialValues'> {
	// Overrides for FormikConfig
	component?: React.ComponentType<TFormProps<Values>> | React.ReactNode;
	render?: (props: TFormProps<Values>) => React.ReactNode;
	children?: ((props: TFormProps<Values>) => React.ReactNode) | React.ReactNode;
	initialValues: InitialValues;
	// Additional TForm config
	loading?: boolean;
	error?: ApolloError;
	onValidate?: (isValid: boolean) => void;
	getSubmitFn?: (submitFormFn: () => Promise<void> | Promise<any>) => void;
	onChange?: (values: Values) => void;
}
