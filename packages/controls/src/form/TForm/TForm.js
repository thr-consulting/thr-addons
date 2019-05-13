import React, {Component} from 'react';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
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

/**
 * Extends Formik to provide Semantic UI error and warning messages and field errors.
 * @class
 * @property {function} render - Render prop just like Formik's with additional arguments passed
 * @property {number} numFields - The number of fields in the form. TForm can't automatically get this number.
 * @property errors - Used to pass in any GraphQL errors.
 * @property {function} onSubmit - Called when the form submits.
 * @property {function} getSubmitFn - Called when the TForm is mounted so you can get access to the submitForm function.
 */
export default class TForm extends Component {
	static displayName = 'TForm';

	componentDidMount() {
		if (this.props.getSubmitFn) this.props.getSubmitFn(this._submitForm);
	}

	renderForm = args => {
		const {errors: warnings, touched, handleChange, setFieldValue, submitForm, ...rest} = args;
		const {errors, render} = this.props;

		this._submitForm = submitForm;

		return render({
			renderWarnings() {
				// we want the error to be displayed once a field has an error AND has been touched.
				const warningArray = [];
				Object.keys(warnings).forEach(warning => {
					if (touched[warning] && warnings[warning]) warningArray.push({message: warnings[warning]});
				});

				if (isEmpty(warningArray) && !errors) return null;
				return (
					<Message warning={!isEmpty(warningArray)} error={!!errors}>
						<Message.Header>{!isEmpty(warningArray) ? 'Some fields are not complete:' : 'Graphql Error:'}</Message.Header>
						{/* Put it in a segment to make sure the errorMessage isn't to big when there are a lot of errors */}
						<Segment style={{overflow: 'auto', maxHeight: 100}}>
							{(!isEmpty(warningArray) ? warningArray : errors.graphQLErrors).map(warning => <div key={warning.message}>{warning.message}</div>)}
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
		const {render, ...rest} = this.props;
		return (
			<Formik render={this.renderForm} {...rest}/>
		);
	}
}
