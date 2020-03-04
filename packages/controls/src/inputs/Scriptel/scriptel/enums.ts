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
	ButtonUp = 'ButtonUp',
	ButtonPress = 'ButtonPress',
}
