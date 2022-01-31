import Gelf, {Logger} from 'gelf-pro';
import winston, {format} from 'winston';
import Transport, {TransportStreamOptions} from 'winston-transport';

interface GelfTransportOptions extends TransportStreamOptions {
	gelfPro: any; // This should be gelf-pro.Settings but it's too restrictive.
}

class GelfTransport extends Transport {
	private logger: Logger;

	constructor(opts: GelfTransportOptions) {
		super(opts);
		this.logger = Object.create(Gelf);
		this.logger.setConfig(opts.gelfPro);
	}

	log({level, message, ...meta}: {level: string; message: string; meta: any}, next: () => void): any {
		setImmediate(() => {
			this.emit('logged', {level, message, meta});
		});

		switch (level) {
			case 'emerg':
				this.logger.emergency(message, meta);
				break;
			case 'alert':
				this.logger.alert(message, meta);
				break;
			case 'crit':
				this.logger.critical(message, meta);
				break;
			case 'error':
				this.logger.error(message, meta);
				break;
			case 'warn':
				this.logger.warn(message, meta);
				break;
			case 'notice':
				this.logger.notice(message, meta);
				break;
			case 'info':
			default:
				this.logger.info(message, meta);
				break;
			case 'debug':
				this.logger.debug(message, meta);
				break;
		}

		next();
	}

	setConfig(opts: GelfTransportOptions) {
		this.logger.setConfig(opts.gelfPro);
	}
}

export interface GelfLoggerParams {
	host: string;
	proto: 'tcp-tls' | 'tcp' | 'udp';
	port: number;
}

export function createGelfLogger({host, proto, port}: GelfLoggerParams) {
	const gelfFormat = winston.format(info => {
		// Pull the error stack out properly if it exists
		if (info.error && info.error.stack) {
			return {...info, stack: info.error.stack};
		}
		return info;
	});
	return new GelfTransport({
		gelfPro: {
			adapterName: proto,
			adapterOptions: {
				host,
				port,
			},
		},
		format: format.combine(format.timestamp(), gelfFormat()),
	});
}
