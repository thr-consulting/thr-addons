// @flow

import React, {Component} from 'react';
import isEmpty from 'lodash/isEmpty';
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
};

/**
 * Extends Formik to provide Semantic UI error and warning messages and field errors.
 * @class
 * @property {function} render - Render prop just like Formik's with additional arguments passed
 * @property {number} numFields - The number of fields in the form. TForm can't automatically get this number.
 * @property errors - Used to pass in any GraphQL errors.
 * @property {function} onSubmit - Called when the form submits.
 */
export default class TForm extends Component<Props> {
	static displayName = 'TForm';

	props: Props;

	renderForm = args => {
		const {errors: warnings, touched} = args;
		const {errors, numFields, render} = this.props;

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
						<Message.Header>Please check the following fields:</Message.Header>
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
			...args,
		});
	};

	render() {
		const {render, numFields, ...rest} = this.props;
		return (
			<Formik render={this.renderForm} {...rest}/>
		);
	}
}
