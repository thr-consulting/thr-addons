import debug from 'debug';
import React, {useEffect, ReactNode} from 'react';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import property from 'lodash/property';
import flat from 'flat';
import {
	Formik,
	FormikConfig,
	FormikProps,
	FieldHelperProps,
	FieldInputProps,
	FieldMetaProps,
	FieldValidator,
	FormikErrors,
	FormikState,
	FormikTouched,
} from 'formik';
import {Message, Segment} from 'semantic-ui-react';

const d = debug('thx.controls.TForm');

interface TFormChildProps<Values> {
	renderWarnings: () => JSX.Element;
	hasErrors: () => boolean;
	hasWarnings: () => boolean;
	fieldError: (fieldName: string) => boolean;
	handleChange: (evOrName: React.ChangeEvent<any> | string) => void;
}

interface TFormProps<Values> {
	errors?: any;
	children?: ((props: FormikProps<Values> & TFormChildProps<Values>) => React.ReactNode) | React.ReactNode;
	loading?: boolean;
	onValidate?: (isValid: boolean) => void;
	getSubmitFn?: (submitFormFn: () => Promise<void> & Promise<any>) => void;
}

// export type TFormRenderProps<Values> ;

function RenderForm<Values>(args: FormikProps<Values> & {tFormProps: TFormProps<Values>}): JSX.Element {
	const {
		tFormProps,
		errors: warnings,
		touched,
		handleChange,
		setFieldValue,
		submitForm,
		isValid,
		submitCount,
		...rest
	} = args;
	const {errors, children, loading, onValidate, getSubmitFn} = tFormProps;

	useEffect(() => {
		if (onValidate) onValidate(isValid);
	}, [isValid]);

	useEffect(() => {
		if (getSubmitFn) getSubmitFn(submitForm);
	}, [submitForm]);

	// function getWarnings<K extends keyof Values>(key: K, formikTouched = touched, formikWarnings = warnings, index = 0): {message: string} {
	// 	const flatWarnings = flat(formikWarnings);
	//
	// }

	// // This is a recursive function that returns all the errors for fields that have errors and have also been touched.
	// function getWarnings<K extends keyof Values>(key: K, formikTouched = touched, formikWarnings = warnings, index = 0) {
	// 	const theWarnings = formikWarnings[key];
	// 	const theTouched = formikTouched[key];
	// 	// if (theWarnings === null || theWarnings === undefined) return [];
	// 	if (theWarnings) {
	// 		// if (typeof theWarnings === 'string') {
	// 		// 	return (typeof theTouched === 'boolean' && theTouched === true) || submitCount > 0
	// 		// 		? [{message: theWarnings}]
	// 		// 		: [];
	// 		// }
	// 		return Object.keys(theWarnings).map((k: K) => {
	// 			return getWarnings(k, theTouched, theWarnings, index + 1);
	// 		});
	// 		// return map(Object.keys(theWarnings), key => getWarnings(key, theTouched, theWarnings, index + 1)).flat();
	// 	}
	// 	return [];
	// }

	// This is a recursive function that returns all the errors for fields that have errors and have also been touched.
	function getWarnings(key, tchd = touched, wrngs = warnings, index = 0) {
		const w = wrngs[key];
		const t = tchd[key];
		if (!w) return [];
		if (typeof w === 'string') return ((typeof t === 'boolean' && t) || submitCount > 0) ? [{message: w}] : [];
		return map(Object.keys(w), k => getWarnings(k, t, w, index + 1)).flat();
	}

	return children({
		renderWarnings() {
			let errorArray = [];
			let errorHeader;
			let errorMessage;

			const warningArray = Object.keys(warnings).map(key => getWarnings(key));

			if (isEmpty(warningArray)) {
				if (!errors) return null;

				// if there are errors and the error has a message then create the the array to loop over.
				if (errors.message) {
					if (!isEmpty(errors.graphQLErrors)) errorArray = errors.graphQLErrors;
					else if (isEmpty(errors.graphQLErrors) && isEmpty(warningArray)) {
						errorMessage = errors.message.slice(errors.message.indexOf(': ') + 1);
						errorArray.push({message: errorMessage});
					}
					errorHeader = errors.message.slice(0, errors.message.indexOf(': '));
				}
			}

			return (
				<Message warning={!isEmpty(warningArray)} error={!!errors}>
					<Message.Header>
						{!isEmpty(warningArray) ? 'Some fields are not complete:' : `${errorHeader}:`}
					</Message.Header>
					{/* Put it in a segment to make sure the errorMessage isn't to big when there are a lot of errors */}
					<Segment style={{overflow: 'auto', maxHeight: 100}}>
						{(!isEmpty(warningArray) ? warningArray : errorArray).map((warning, index) => (
							<div key={warning.message.concat(index)}>{warning.message}</div>
						))}
					</Segment>
				</Message>
			);
		},
		hasErrors() {
			return !!errors;
		},
		hasWarnings() {
			// the old way checks to make sure all fields have been touched, but I think we want to show once there are any warnings...
			// return Object.keys(touched).length === numFields && !isEmpty(warnings); // this is the old way.
			return !isEmpty(warnings);
		},
		fieldError(fieldName) {
			return !!(property(fieldName)(touched) || submitCount > 0) && !!property(fieldName)(warnings);
		},
		handleChange(evOrName) {
			if (evOrName.nativeEvent) return handleChange(evOrName);
			if (isString(evOrName)) {
				return val => {
					setFieldValue(evOrName, val);
				};
			}
			throw new Error('TForm expects handleChange to receive a SyntheticEvent or a string value of the field name');
		},
		errors: warnings,
		touched,
		setFieldValue,
		submitForm,
		loading,
		isValid,
		...rest,
	});
}

/**
 * Extends Formik to provide Semantic UI error and warning messages and field errors.
 * @function
 * @property {function} render - Render prop just like Formik's with additional arguments passed
 * @property {number} numFields - The number of fields in the form. TForm can't automatically get this number.
 * @property {boolean} loading - Passes the loading state through to the child component.
 * @property errors - Used to pass in any GraphQL errors.
 * @property {function} onSubmit - Called when the form submits.
 * @property {function} getSubmitFn - Called when the TForm is mounted so you can get access to the submitForm function.
 */
export default function TForm<Values>(props: FormikConfig<Values> & TFormProps<Values>) {
	const {render, enableReinitialize = true, ...rest} = props;

	return (
		<Formik<Values> enableReinitialize={enableReinitialize} {...rest}>
			{renderProps => {
				return <RenderForm {...renderProps} tFormProps={props} />;
			}}
		</Formik>
	);
}

