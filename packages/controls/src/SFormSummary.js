// @flow

import React from 'react';
import Form from 'react-formal';
import hash from 'string-hash';
import {Message} from 'semantic-ui-react';

type Props = {
	otherErrors?: string[],
};

/**
 * Displays a message indicating any errors with the form. Include inside a SForm to automatically read the form's errors.
 * @class
 * @property {string[]} otherErrors - An array of additional errors strings to display.
 */
export default function SFormSummary(props: Props) {
	const otherErrors = (props.otherErrors) ? (
		<ul>
			{props.otherErrors.map(msg => <li key={hash(msg)}>{msg}</li>)}
		</ul>
	) : null;

	return (
		<Message error>
			<Form.Summary/>
			{otherErrors}
		</Message>
	);
}
