/* globals WebSocket: true */
import debug from 'debug';
import EventEmitter from 'eventemitter3';
import type {ConnectionOpen, DeviceOpenResponse, Message, RenderedImage} from './messages';
import {ScriptelMessageClass, ScriptelPenStyle} from './enums';

const d = debug('thx.controls.Scriptel.API');

export interface ScriptelSocketArgs {
	omniscriptUrl?: string; // Defaults to 'ws://localhost:8080'
	imageType?: string; // Defaults to 'image/svg+xml'.
	scale?: number; // Defaults to 1
	crop?: boolean; // Defaults to false
	penStyle?: ScriptelPenStyle; // Defaults to 'PlainPenStyle'
	render?: () => void;
}

function serverConnected(msg: ConnectionOpen, socket: WebSocket) {
	d('Server connected');
	if (msg.serverInfo.devices.length > 0) {
		// Grab the first available device
		const device = msg.serverInfo.devices[0];
		socket.send(
			JSON.stringify({
				_class: 'DeviceOpenRequest',
				uuid: device.uuid,
			}),
		);
	}
}

function deviceConnected(msg: DeviceOpenResponse, socket: WebSocket, args: ScriptelSocketArgs) {
	d(`Device connected: ${msg.device.uuid}`);
	const {imageType, scale, crop, penStyle} = args;
	socket.send(
		JSON.stringify({
			_class: 'RenderSettingsUpdateRequest',
			renderSettings: {
				_class: 'RenderSettings',
				type: imageType || 'image/svg+xml',
				scale: scale || 1,
				crop: crop || false,
				penStyle: penStyle
					? {
							renderFunction: penStyle,
					  }
					: {
							renderFunction: ScriptelPenStyle.Plain,
					  },
			},
		}),
	);
}

function render(msg: RenderedImage, args: ScriptelSocketArgs, eventEmitter: EventEmitter) {
	d(`Rendered image: ${msg.type} ${msg.width}x${msg.height}`);
	eventEmitter.emit('render', msg);
}

export class ScriptelSocket extends EventEmitter {
	private socket: WebSocket;
	private options: ScriptelSocketArgs;

	constructor(args: ScriptelSocketArgs) {
		super();

		this.options = args;

		this.socket = new WebSocket(args.omniscriptUrl || 'ws://localhost:8080');

		this.socket.onopen = () => {
			d('Socket open');
		};

		this.socket.onclose = () => {
			d('Socket closed');
		};

		this.socket.onmessage = ev => {
			const msg = JSON.parse(ev.data) as Message;
			if (!msg._class) return; // A message with no class.

			switch (msg._class) {
				case ScriptelMessageClass.ConnectionOpen:
					serverConnected(msg, this.socket);
					break;
				case ScriptelMessageClass.DeviceOpenResponse:
					deviceConnected(msg, this.socket, this.options);
					break;
				case ScriptelMessageClass.RenderedImage:
					render(msg, this.options, this);
					break;
				case ScriptelMessageClass.ScriptelException:
					d(`Scriptel Exception Error: ${msg.message}`);
					break;

				case ScriptelMessageClass.ButtonPress:
					if (msg.label === 'Cancel') this.emit('cancel');
					break;
				case ScriptelMessageClass.ButtonDown:
					if (msg.label === 'OK') this.emit('okButtonDown');
					break;
				case ScriptelMessageClass.PenMove:
					this.emit('penMove');
					break;
				case ScriptelMessageClass.PenUp:
					this.emit('penUp');
					break;
				default:
			}
		};
	}

	calibrate() {
		d('calibrate');
		this.socket.send(JSON.stringify({_class: 'ForceRecalibrate'}));
	}

	close() {
		this.socket.close();
	}
}
