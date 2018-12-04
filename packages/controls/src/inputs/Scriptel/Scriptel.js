// @flow
/* globals WebSocket: true */

import React, {Component} from 'react';
import debug from 'debug';
import remove from 'lodash/remove';
import {ScriptelContext} from './ScriptelContext';

const d = debug('thx:Scriptel');

type Props = {
	omniscript?: string,
	imageType?: string,
	scale?: number,
	crop?: boolean,
	penStyle?: string,
	children: any,
};

/**
 * Manages a connection to the Scriptel Omniscript server.
 */
export default class extends Component<Props> {
	constructor(props) {
		super(props);
		this._renderers = [];
		this.contextValue = {
			addOnRender: renderer => {
				d('Adding renderer');
				this._renderers.push(renderer);
			},
			removeOnRender: renderer => {
				d('Removing renderer');
				remove(this._renderers, v => v === renderer);
			},
			render: msg => {
				this._renderers.forEach(v => v(msg));
			},
		};
	}

	componentDidMount() {
		const {omniscript} = this.props;
		this._socket = new WebSocket(omniscript || 'ws://localhost:8080');
		this._socket.onopen = () => {
			d('Socket open');
		};
		this._socket.onclose = () => {
			d('Socket closed');
		};
		this._socket.onmessage = ev => {
			const msg = JSON.parse(ev.data);
			switch (msg._class) { // eslint-disable-line no-underscore-dangle
				case 'ConnectionOpen':
					this.serverConnected({msg, socket: this._socket});
					break;
				case 'DeviceOpenResponse':
					this.deviceConnected({msg, socket: this._socket});
					break;
				case 'RenderedImage':
					this.contextValue.render(msg);
					break;
				case 'ScriptelException':
					d(`Scriptel Exception Error: ${msg.message}`);
					break;
				default:
					// d(`Unhandled msg: ${msg._class}`);
					// d(msg);
					break;
			}
			// Other events:
			//  RenderSettingsUpdateResponse
			//  PenDown, PenUp, PenMove
			//  ButtonDown, ButtonPress,
			//  ConnectionDeviceMembershipChange, DeviceCloseResponse
		};
	}

	componentWillUnmount() {
		this._socket.close();
		this._renderers = [];
	}

	/**
	 * Called when connected to the server.
	 * @param msg
	 * @param socket
	 */
	serverConnected({msg, socket}) {
		d('Server connected');
		if (msg.serverInfo.devices.length > 0) {
			// Grab the first available device
			const device = msg.serverInfo.devices[0];
			socket.send(JSON.stringify({
				_class: 'DeviceOpenRequest',
				uuid: device.uuid,
			}));
		}
	}

	/**
	 * Called when connected to the device.
	 * @param socket
	 */
	deviceConnected({socket}) {
		d('Device connected');
		const {imageType, scale, crop, penStyle} = this.props;
		socket.send(JSON.stringify({
			_class: 'RenderSettingsUpdateRequest',
			renderSettings:
				{
					_class: 'RenderSettings',
					type: imageType || 'image/svg+xml', // image/png, image/svg+xml
					scale: scale || 1,
					crop: crop || false,
					penStyle: penStyle ? {
						renderFunction: penStyle,
					} : {
						renderFunction: 'PlainPenStyle', // PlainPenStyle, ChiselPenStyle, InkwellPenStyle
					},
				},
		}));
	}

	render() {
		return (
			<ScriptelContext.Provider value={this.contextValue}>
				{this.props.children}
			</ScriptelContext.Provider>
		);
	}
}
