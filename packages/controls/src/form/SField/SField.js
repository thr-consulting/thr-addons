// @flow

import React from 'react';
import type {ChildrenArray} from 'react';
import {connectToMessageContainer} from 'react-input-message';
import {Form} from 'semantic-ui-react';

type Props = {
	for: string,
	messages: Object,
	children?: ChildrenArray<*>,
};

/**
 * A SemanticUI field with error markings.
 * @class
 * @deprecated SForm is no longer being used. Use TForm instead.
 * @property {string} for - The React Formal Form.Field name.
 * @property {Component[]} children - React children elements.
 * @property {string} className - Additional class names applied to the field div.
 * @property {Object[]} messages - Error messages from React Formal form.
 */
function SField(props: Props) {
	return (
		<Form.Field
			error={!!props.messages[props.for]}
		>
			{props.children}
		</Form.Field>
	);
}

export default connectToMessageContainer.default(SField);
