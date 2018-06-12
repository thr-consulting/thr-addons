// @flow

import React, {Component} from 'react';
import isEmpty from 'lodash/isEmpty';
import {Formik} from 'formik';
import {Message} from 'semantic-ui-react';

type Props = {
	render: any,
	numFields: number,
	errors?: any,
	onSubmit: data => void,
};

export default class TForm extends Component<Props> {
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
