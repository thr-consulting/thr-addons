import winston, {format} from 'winston';
import GelfTransport from 'winston-gelf';
import FileRotateTransport from 'fast-file-rotate';
import colors from 'colors/safe';
import isError from 'lodash/isError';
import compact from 'lodash/compact';
import isObject from 'lodash/isObject';

export function configureLog({getSessionId, appName, name, logTo}) {
	let logToArray;
	if (logTo) {
		logToArray = logTo;
	} else {
		logToArray = process.env.LOG_TO ? process.env.LOG_TO.split(',') : ['console'];
	}

	if (process.env.NODE_ENV === 'test') {
		logToArray = [];
	}

	// Configure Winston
	const logger = winston.loggers.add(name || 'log', {
		level: process.env.LOG_LEVEL || 'info',
		silent: process.env.NODE_ENV === 'test',
	});

	// Console
	if (logToArray.includes('console')) {
		logger.add(new (winston.transports.Console)({
			format: format.combine(
				format.colorize(),
				format.label({label: appName}),
				format.timestamp(),
				format.printf(info => compact([
					colors.cyan(info.timestamp),
					`${colors.white.bold(info.label)}[${colors.yellow.bold(getSessionId())}]:`,
					info.groupId ? `{${colors.white.bold(info.groupId)}}` : null,
					`<${info.level}>`,
					info.message,
					info.stack ? `\n  ${info.stack}` : null,
				]).join(' ')),
			),
		}));
	}

	// File
	if (logToArray.includes('file')) {
		logger.add(new FileRotateTransport({
			fileName: process.env.LOG_FILE || 'winston-%DATE%.log',
			dateFormat: 'YYYYMMDD',
			format: format.combine(
				format.label({label: appName}),
				format.timestamp(),
				format.printf(info => compact([
					info.timestamp,
					`${info.label}[${getSessionId()}]:`,
					info.groupId ? `{${info.groupId}}` : null,
					`<${info.level}>`,
					info.message,
					info.stack ? `\n  ${info.stack}` : null,
				]).join(' ')),
			),
		}));
	}

	// GELF
	const gelfFormat = winston.format(info => Object.assign({}, info, {sessionId: getSessionId(), groupId: info.groupId}));
	if (logToArray.includes('gelf')) {
		logger.add(new GelfTransport({
			gelfPro: {
				fields: {
					app: appName,
					env: process.env.NODE_ENV,
				},
				adapterName: process.env.LOG_GELF_PROTO || 'udp',
				adapterOptions: {
					host: process.env.LOG_GELF_HOST,
					port: process.env.LOG_GELF_PORT || 12201,
				},
			},
			format: format.combine(
				gelfFormat(),
			),
		}));
	}

	return logger;
}

// level
// message

// log().silly(sessid, 'message);
// log().silly('message');

export default function log(name) {
	const l = winston.loggers.get(name || 'log');
	return {
		silly(message, groupId) {
			l.silly(isObject(message) ? {...message, groupId} : {message, groupId});
		},
		debug(message, groupId) {
			l.debug(isObject(message) ? {...message, groupId} : {message, groupId});
		},
		verbose(message, groupId) {
			l.verbose(isObject(message) ? {...message, groupId} : {message, groupId});
		},
		info(message, groupId) {
			l.info(isObject(message) ? {...message, groupId} : {message, groupId});
		},
		warn(message, groupId) {
			l.warn(isObject(message) ? {...message, groupId} : {message, groupId});
		},
		error(message, groupId) {
			l.error(isObject(message) ? {...message, groupId} : {message, groupId});
		},
	};
}

export function waitForLogger(name, cb) {
	const l = winston.loggers.get(name || 'log');
	l.on('finish', () => {
		setTimeout(cb, 1000);
	});
	l.end();
}

export function logError(error, groupId, logName) {
	if (isError(error)) {
		log(logName).error({message: error.toString(), stack: error.stack}, groupId);
	} else {
		log(logName).error(error.toString(), groupId);
	}
}
