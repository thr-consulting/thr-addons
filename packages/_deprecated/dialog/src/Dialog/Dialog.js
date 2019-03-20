// @flow

import React, {Children} from 'react';
import type {ChildrenArray} from 'react';
import {Segment, Container} from 'semantic-ui-react';

type Props = {
	children: ChildrenArray<*>,
};

/**
 * A container component for custom slide up dialogs.
 * @class
 * @property {ChildrenArray} children - Dialog internal components
 */
export default function Dialog(props: Props) {
	if (Children.count(props.children) === 1) {
		return (
			<Segment basic>
				<Container>
					{props.children}
				</Container>
			</Segment>
		);
	}

	const children = Children.toArray(props.children);
	let buttons;
	if (children[children.length - 1].type.name === 'DialogButtons') {
		buttons = children.pop();
	}

	return (
		<Segment basic>
			<Container>
				{children}
			</Container>
			{buttons}
		</Segment>
	);
}
