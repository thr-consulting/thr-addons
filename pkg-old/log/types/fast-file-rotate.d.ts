declare module 'fast-file-rotate' {
	import Transport from 'winston-transport';

	interface FastFileRotateTransportOptions extends Transport.TransportStreamOptions {
		fileName: string;
		dateFormat?: string;
		bufferSize?: number;
	}

	class FastFileRotateTransportInstance extends Transport {
		constructor(options: FastFileRotateTransportOptions);
	}

	export = FastFileRotateTransportInstance;
}
