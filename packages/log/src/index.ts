import winston, {format} from 'winston';
// @ts-ignore
import GelfTransport from 'winston-gelf';
// @ts-ignore
import FileRotateTransport from 'fast-file-rotate';
import colors from 'colors/safe';
import isError from 'lodash/isError';
import compact from 'lodash/compact';
import isObject from 'lodash/isObject';

function getLogToArray(logTo?: string[], envLogTo?: string, envNodeEnv?: string) {
	if (envNodeEnv === 'test') return [];
	if (logTo) return logTo;
	if (envLogTo) return envLogTo.split(',');
	return ['console'];
}

function createConsoleLogger({appName}: {appName: string}) {
	return new winston.transports.Console({
		format: format.combine(
			format.colorize(),
			format.label({label: appName}),
			format.timestamp(),
			format.printf(info =>
				compact([
					colors.cyan(info.timestamp),
					// @ts-ignore
					`${colors.white.bold(info.label)}[${colors.yellow.bold('session')}]:`,
					// @ts-ignore
					info.groupId ? `{${colors.white.bold(info.groupId)}}` : null,
					`<${info.level}>`,
					info.message,
					info.stack ? `\n  ${info.stack}` : null,
				]).join(' '),
			),
		),
	});
}

function createFileLogger({appName, envFileName}: {appName: string; envFileName?: string}) {
	return new FileRotateTransport({
		fileName: envFileName,
		dateFormat: 'YYYYMMDD',
		format: format.combine(
			format.label({label: appName}),
			format.timestamp(),
			format.printf(info =>
				compact([
					info.timestamp,
					`${info.label}[session]:`,
					info.groupId ? `{${info.groupId}}` : null,
					`<${info.level}>`,
					info.message,
					info.stack ? `\n  ${info.stack}` : null,
				]).join(' '),
			),
		),
	});
}

function createGelfLogger({
	appName,
	envGelfHost,
	envGelfProto,
	envGelfPort,
	envNodeEnv,
}: {
	appName: string;
	envGelfHost: string;
	envGelfProto: string;
	envGelfPort: number;
	envNodeEnv?: string;
}) {
	const gelfFormat = winston.format(info => ({...info, ...{sessionId: 'session', groupId: info.groupId}}));
	return new GelfTransport({
		gelfPro: {
			fields: {
				app: appName,
				env: envNodeEnv,
			},
			adapterName: envGelfProto,
			adapterOptions: {
				host: envGelfHost,
				port: envGelfPort,
			},
		},
		format: format.combine(gelfFormat()),
	});
}

export function configureLog({appName, name, logTo}: {appName: string; name?: string; logTo?: string[]}) {
	const envLogTo = process.env.LOG_TO;
	const envNodeEnv = process.env.NODE_ENV;
	const envLogLevel = process.env.LOG_LEVEL;
	const envGelfHost = process.env.LOG_GELF_HOST;
	const envGelfProto = process.env.LOG_GELF_PROTO || 'udp';
	const envGelfPort = process.env.LOG_GELF_PORT ? parseInt(process.env.LOG_GELF_PORT, 10) : 12201;
	const envFileName = process.env.LOG_FILE_NAME || 'winston-%DATE%.log';

	const logToArray = getLogToArray(logTo, envLogTo, envNodeEnv);

	// Configure Winston
	const logger = winston.loggers.add(name || 'log', {
		level: envLogLevel || 'info',
		silent: envNodeEnv === 'test',
	});

	// Console
	if (logToArray.includes('console')) {
		logger.add(createConsoleLogger({appName}));
	}

	// File
	if (logToArray.includes('file')) {
		logger.add(createFileLogger({appName, envFileName}));
	}

	// GELF
	if (logToArray.includes('gelf')) {
		if (!envGelfHost) throw new Error('GELF Host not specified.');
		logger.add(createGelfLogger({appName, envGelfHost, envGelfProto, envGelfPort}));
	}

	return logger;
}

export type Message = string | {[key: string]: any};

export default function log(name?: string) {
	const l = winston.loggers.get(name || 'log');
	return {
		silly(message: Message, groupId?: string) {
			l.silly(isObject(message) ? {...message, groupId} : {message, groupId});
		},
		debug(message: Message, groupId?: string) {
			l.debug(isObject(message) ? {...message, groupId} : {message, groupId});
		},
		verbose(message: Message, groupId?: string) {
			l.verbose(isObject(message) ? {...message, groupId} : {message, groupId});
		},
		info(message: Message, groupId?: string) {
			l.info(isObject(message) ? {...message, groupId} : {message, groupId});
		},
		warn(message: Message, groupId?: string) {
			l.warn(isObject(message) ? {...message, groupId} : {message, groupId});
		},
		error(message: Message, groupId?: string) {
			l.error(isObject(message) ? {...message, groupId} : {message, groupId});
		},
	};
}

export function waitForLogger(name: string, cb: () => void) {
	const l = winston.loggers.get(name || 'log');
	l.on('finish', () => {
		setTimeout(cb, 1000);
	});
	l.end();
}

export function logError(error: Record<string, unknown> | string | number, groupId?: string, logName?: string) {
	if (isError(error)) {
		log(logName).error({message: error.toString(), stack: error.stack}, groupId);
	} else {
		log(logName).error(error.toString(), groupId);
	}
}
