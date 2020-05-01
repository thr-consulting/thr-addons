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

export interface ButtonUp {
	_class: ScriptelMessageClass.ButtonUp;
	id: number;
	label: string;
}

export type Message = ConnectionOpen | DeviceOpenResponse | RenderedImage | ScriptelException | ButtonPress | ButtonUp;
