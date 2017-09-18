// @flow

import React, {Component} from 'react';
import type {ChildrenArray} from 'react';
import ReactNotificationSystem from 'react-notification-system';
import {registerNotificationSystem} from './registerNotificationSystem';

type Props = {
	children: ChildrenArray<*>,
};

export default class NotificationSystem extends Component<Props> {
	componentDidMount() {
		registerNotificationSystem(this._notify);
	}

	props: Props;
	_notify: ?HTMLElement;

	render() {
		return (
			<div style={{height: '100%'}}>
				{this.props.children}
				<ReactNotificationSystem ref={r => (this._notify = r)}/>
			</div>
		);
	}
}
