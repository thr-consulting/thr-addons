// @flow

import React from 'react';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import hash from 'string-hash';
import {Grid} from 'semantic-ui-react';
import Message from './Message';

type Props = {
	messages: Map<'key', string>,
	className?: string,
};

export function MessagesComponent(props: Props) {
	if (props.messages.size === 0) return null;
	return (
		<Grid.Row>
			<Grid.Column className={props.className}>
				{props.messages.valueSeq().map(value => <Message message={value} key={hash(value)}/>)}
			</Grid.Column>
		</Grid.Row>
	);
}

const mapStateToProps = state => ({
	messages: state.get('messages'),
});

export default connect(mapStateToProps)(MessagesComponent);
