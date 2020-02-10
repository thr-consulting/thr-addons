export interface DeviceEndpoint {
	protocolDriver: {
		features: string[];
	};
	devHandle: {
		productId: number;
		vendorId: number;
		manufacturer: string;
		model: string;
		path: string;
	};
	manufacturer: string;
	path: string;
	product: string;
	productId: string;
	uuid: string;
	vendorId: string;
}

export interface DisplayInfo {
	captionLength: number;
	characterHeight: number;
	characterWidth: number;
	colorDepth: number;
	height: number;
	regionCount: number;
	width: number;
}

export interface SoftwareVersion {
	asicSignature: number;
	firmwareVersion: {
		major: number;
		minor: number;
		release: number;
	};
	kernelVersion: {
		major: number;
		minor: number;
		release: number;
	};
}

export interface DisplaySettings {
	blue: number;
	brightness: number;
	command: number;
	contract: number;
	green: number;
	red: number;
}

export interface CalibrationMode {
	calibrating: boolean;
	calibrationPoint: string;
}

export interface RegionButtonFlags {
	clearOnSelect: boolean;
	confirmOnSelect: boolean;
	enabled: boolean;
	highlightOnSelect: boolean;
}

export interface RegionButton {
	caption: string;
	flags: RegionButtonFlags;
	parentContainer: number;
}

export interface RegionContainerFlags {
	inkEnabled: boolean;
}

export interface RegionContainer {
	flags: RegionContainerFlags;
}

export interface RegionLine {
	lineWidth: number;
	parentContainer: number;
}

export interface RegionFlags {
	acceptsTouch: boolean;
	decodeRegion: boolean;
	hasFrame: boolean;
	inUse: boolean;
	visible: boolean;
}

export interface Region {
	backgroundColor: number[];
	buttonType?: RegionButton;
	containerType?: RegionContainer;
	flags: RegionFlags;
	foregroundColor: number[];
	id: number;
	lineType?: RegionLine;
	x1: number;
	x2: number;
	y1: number;
	y2: number;
}

export interface ScreenErrorCorrection {
	boundX1: number;
	boundX2: number;
	boundY1: number;
	boundY2: number;
	correctionMap: number[][];
	valid: boolean;
	xDelta: number;
	xMin: number;
	xOffset: number;
	yDelta: number;
	yMin: number;
	yOffset: number;
}

export interface CoordinateRange {
	xMin: number;
	xMax: number;
	yMin: number;
	yMax: number;
}

export interface Capabilities {
	displayId: string;
	// There is more...
}

export interface OperatingMode {
	touch: boolean;
	pen: boolean;
	autoTouch: boolean;
	securePen: boolean;
	secureAutoTouch: boolean;
	command: boolean;
	acquisitionMode: string;
	touchMode: string;
	penMode: string;
}

export interface ScriptelDevice {
	uuid: string;
	serialNumber: string;
	model: string;
	manufacturer: string;
	vendorId: number;
	productId: number;
	calibrationMode: CalibrationMode;
	displayInfo: DisplayInfo;
	displaySettings: DisplaySettings;
	errorCorrection: ScreenErrorCorrection;
	regions: Region[];
	softwareVersion: SoftwareVersion;
	coordinateRange: CoordinateRange;
	capabilities: Capabilities;
	operatingMode: OperatingMode;
}
