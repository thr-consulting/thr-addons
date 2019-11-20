// @flow

import React from 'react';
import type {ChildrenArray} from 'react';
import {Divider, Button, Container} from 'semantic-ui-react';
import './dialogButtons.css';

type Props = {
	children: ChildrenArray<*>,
	onApprove: () => {},
	onReject: () => {},
	onRemove: () => {},
	container?: boolean,
};

/**
 * Standard set of buttons for use with Dialog.
 * @class
 * @property {ChildrenArray} children - Override with custom buttons if needed.
 * @property {function} onApprove - Called when the dialog is approved.
 * @property {function} onReject - Called when the dialog is canceled.
 * @property {function} onRemove - Called when the delete action is clicked.
 * @property {bool} [container=true] - If true, applies the Semantic UI container class to the buttons.
 */
export default function DialogButtons(props: Props) {
	const deleteButton = props.onRemove ? <Button onClick={props.onRemove}>Delete</Button> : null;
	const approveButton = props.onApprove
		?	<Button positive floated="right" onClick={props.onApprove}>Save</Button> : null;
	const rejectButton = props.onReject ? <Button color="black" onClick={props.onReject}>Cancel</Button> : null;
	const Wrapper = props.container === false ? 'div' : Container;

	const buttonContainer = props.children ? (
		<Wrapper className="dialog_buttonWrapper">
			{props.children}
		</Wrapper>
	) : (
		<Wrapper className="dialog_buttonWrapper">
			{deleteButton}
			<div className="dialog_rightButtons">
				{approveButton}
				{rejectButton}
			</div>
		</Wrapper>
	);

	return (
		<div>
			<Divider/>
			{buttonContainer}
		</div>
	);
}
