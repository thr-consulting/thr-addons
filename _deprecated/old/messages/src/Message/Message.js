// @flow

/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Message as SMessage, Icon, List} from 'semantic-ui-react';
import {clearMessage} from '../messagesActions';

type Props = {
	clearMessage: (id: string) => {},
	message: {
		id: string,
		level: string,
		message: string | string[],
		title: string,
	},
};

export function MessageComponent(props: Props) {
	const warning = props.message.level === 'warning';
	const error = props.message.level === 'error';
	const info = props.message.level === 'info';
	const success = props.message.level === 'success';
	if (Array.isArray(props.message.message)) {
		return (
			<SMessage warning={warning} error={error} info={info} success={success}>
				<Icon name="close" onClick={() => props.clearMessage(props.message.id)}/>
				<SMessage.Header>{props.message.title}</SMessage.Header>
				<List bulleted>
					{props.message.message.map(message => <List.Item key={message}>{message}</List.Item>)}
				</List>
			</SMessage>
		);
	}
	return (
		<SMessage warning={warning} error={error} info={info} success={success}>
			<Icon name="close" onClick={() => props.clearMessage(props.message.id)}/>
			<SMessage.Header>{props.message.title}</SMessage.Header>
			<p>{props.message.message}</p>
		</SMessage>
	);
}

const mapDispatchToProps = dispatch => bindActionCreators({
	clearMessage,
}, dispatch);

export default connect(null, mapDispatchToProps)(MessageComponent);
