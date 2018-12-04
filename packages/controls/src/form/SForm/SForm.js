// @flow

/* eslint-disable react/forbid-prop-types */
import React, {Component} from 'react';
import type {ChildrenArray} from 'react';
import Formal from 'react-formal';
import isEmpty from 'lodash/isEmpty';
import {Form} from 'semantic-ui-react';
import SFormSummary from '../SFormSummary';
import SField from '../SField';

type Props = {
	showSummary?: boolean,
	otherErrors?: string[],
	children?: ChildrenArray<*>,
	onError?: (event: Event) => {},
};

type State = {
	error: boolean,
};

/**
 * Renders a React Formal form using SemanticUI.
 * @class
 * @deprecated SForm is no longer being used. Use TForm instead.
 * @property {boolean} [showSummary=false] - If true, displays the summary above the form children.
 * @property {Components[]} children - Child React elements.
 * @property {string[]} otherErrors - An array of error strings passed to the SFormSummary.
 */
export default class SForm extends Component<Props, State> {
	static Field = SField;

	static Summary = SFormSummary;

	static defaultProps = {
		showSummary: false,
	};

	state = {
		error: false,
	};

	handleError = (e: Event) => {
		this.setState({error: !isEmpty(e)});
		if (this.props.onError) this.props.onError(e);
	};


	// submit() {
	// 	if (this._form) this._form.submit();
	// }

	render() {
		const {showSummary, otherErrors, ...rest} = this.props;
		const summary = showSummary ? <SFormSummary otherErrors={otherErrors}/> : null;
		const error = this.state.error || !!otherErrors;

		return (
			<Form
				as={Formal}
				onError={this.handleError}
				error={error}
				{...rest}
			>
				{summary}
				{this.props.children}
			</Form>
		);
	}
}
