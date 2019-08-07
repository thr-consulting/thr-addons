import React, {useEffect} from 'react';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import property from 'lodash/property';
import {Formik} from 'formik';
import {Message, Segment} from 'semantic-ui-react';

// type Props = {
// 	/** Render prop just like Formik's with additional arguments passed */
// 	render: any,
// 	/** Used to pass in any GraphQL errors. */
// 	errors?: any,
// 	/** Called when the form submits. */
// 	onSubmit: data => void,
// 	/** Called when the TForm is mounted so you can get access to the submitForm function. */
// 	getSubmitFn: fn => void,
// };

function RenderForm(args) {
	const {tFormProps, errors: warnings, touched, handleChange, setFieldValue, submitForm, isValid, submitCount, ...rest} = args;
	const {errors, render, loading, onValidate, getSubmitFn} = tFormProps;

	useEffect(() => {
		if (onValidate) onValidate(isValid);
	}, [isValid]);

	useEffect(() => {
		if (getSubmitFn) getSubmitFn(submitForm);
	}, [submitForm]);

	// This is a recursive function that returns all the errors for fields that have errors and have also been touched.
	function getWarnings(key, tchd = touched, wrngs = warnings, index = 0) {
		const w = wrngs[key];
		const t = tchd[key];
		if (!w) return [];
		if (typeof w === 'string') return (typeof t === 'boolean' && t) ? [{message: w}] : [];
		return map(Object.keys(w), k => getWarnings(k, t, w, index + 1)).flat();
	}

	return render({
		renderWarnings() {
			const warningArray = [];
			let errorArray = [];
			let errorHeader;
			let errorMessage;

			// adds the relevant warnings to the warnings array.
			Object.keys(warnings).forEach(key => {
				warningArray.push(...getWarnings(key));
			});

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
					<Message.Header>{!isEmpty(warningArray) ? 'Some fields are not complete:' : `${errorHeader}:`}</Message.Header>
					{/* Put it in a segment to make sure the errorMessage isn't to big when there are a lot of errors */}
					<Segment style={{overflow: 'auto', maxHeight: 100}}>
						{(!isEmpty(warningArray)
							? warningArray
							: errorArray).map((warning, index) => <div key={warning.message.concat(index)}>{warning.message}</div>)}
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
export default function TForm(props) {
	const {render, enableReinitialize = true, ...rest} = props;
	return (
		<Formik
			enableReinitialize={enableReinitialize}
			render={renderProps => <RenderForm {...renderProps} tFormProps={props}/>}
			{...rest}
		/>
	);
}
