export enum ScriptelPenStyle {
	Plain = 'PlainPenStyle',
	Chisel = 'ChiselPenStyle',
	Inkwell = 'InkwellPenStyle',
}

export enum ScriptelMessageClass {
	ConnectionOpen = 'ConnectionOpen',
	DeviceOpenRequest = 'DeviceOpenRequest',
	DeviceOpenResponse = 'DeviceOpenResponse',
	RenderedImage = 'RenderedImage',
	ScriptelException = 'ScriptelException',
	ButtonDown = 'ButtonDown',
	ButtonPress = 'ButtonPress',
	PenMove = 'PenMove',
	PenUp = 'PenUp',
}
