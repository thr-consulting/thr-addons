import type {DeviceEndpoint, ScriptelDevice} from './classes';
import type {ScriptelMessageClass} from './enums';

export interface ConnectionOpen {
	_class: ScriptelMessageClass.ConnectionOpen;
	serverInfo: {
		devices: DeviceEndpoint[];
		hostname: string;
		safe: boolean;
	};
}

export interface DeviceOpenResponse {
	_class: ScriptelMessageClass.DeviceOpenResponse;
	device: ScriptelDevice;
}

export interface RenderedImage {
	_class: ScriptelMessageClass.RenderedImage;
	data: string;
	height: number;
	type: string;
	width: number;
}

export interface ScriptelException {
	_class: ScriptelMessageClass.ScriptelException;
	message: string;
}

export interface ButtonPress {
	_class: ScriptelMessageClass.ButtonPress;
	accept: boolean;
	clear: boolean;
	id: number;
	label: string;
}

export interface ButtonDown {
	_class: ScriptelMessageClass.ButtonDown;
	id: number;
	label: string;
	x: number;
	y: number;
}

export interface PenMove {
	_class: ScriptelMessageClass.PenMove;
	time: number;
	x: string;
	y: string;
}

export interface PenUp {
	_class: ScriptelMessageClass.PenUp;
	time: number;
	x: string;
	y: string;
}

export type Message = ConnectionOpen | DeviceOpenResponse | RenderedImage | ScriptelException | ButtonPress | ButtonDown | PenMove | PenUp;
