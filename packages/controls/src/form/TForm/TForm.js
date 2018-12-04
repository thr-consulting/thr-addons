// @flow

import React, {Component} from 'react';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import {Formik} from 'formik';
import {Message} from 'semantic-ui-react';

type Props = {
	/** Render prop just like Formik's with additional arguments passed */
	render: any,
	/** The number of fields in the form. TForm can't automatically get this number. */
	numFields: number,
	/** Used to pass in any GraphQL errors. */
	errors?: any,
	/** Called when the form submits. */
	onSubmit: data => void,
	/** Called when the TForm is mounted so you can get access to the submitForm function. */
	getSubmitFn: fn => void,
};

/**
 * Extends Formik to provide Semantic UI error and warning messages and field errors.
 * @class
 * @property {function} render - Render prop just like Formik's with additional arguments passed
 * @property {number} numFields - The number of fields in the form. TForm can't automatically get this number.
 * @property errors - Used to pass in any GraphQL errors.
 * @property {function} onSubmit - Called when the form submits.
 * @property {function} getSubmitFn - Called when the TForm is mounted so you can get access to the submitForm function.
 */
export default class TForm extends Component<Props> {
	static displayName = 'TForm';

	componentDidMount() {
		if (this.props.getSubmitFn) this.props.getSubmitFn(this._submitForm);
	}


	renderForm = args => {
		const {errors: warnings, touched, handleChange, setFieldValue, submitForm, ...rest} = args;
		const {errors, numFields, render} = this.props;

		this._submitForm = submitForm;

		return render({
			renderErrors() {
				if (!errors) return null;
				const {graphQLErrors} = errors;
				return (
					<Message error>
						<Message.Header>Error</Message.Header>
						{graphQLErrors.map(err => (
							<p key={err.message}>{err.message}</p>
						))}
					</Message>
				);
			},
			renderWarnings() {
				if (isEmpty(warnings)) return null;
				return (
					<Message warning>
						<Message.Header>Some fields are not complete:</Message.Header>
						<ul>
							{Object.keys(warnings).map(warning => (
								<li key={warning}>{warnings[warning]}</li>
							))}
						</ul>
					</Message>
				);
			},
			hasErrors() {
				return !!errors;
			},
			hasWarnings() {
				return Object.keys(touched).length === numFields && !isEmpty(warnings);
			},
			fieldError(fieldName) {
				return !!(touched[fieldName] && warnings[fieldName]);
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
			...rest,
		});
	};

	render() {
		const {render, numFields, ...rest} = this.props;
		return (
			<Formik render={this.renderForm} {...rest}/>
		);
	}
}
