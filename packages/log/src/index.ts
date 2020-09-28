import debug from 'debug';
import type winston from 'winston';
import {createConsoleLogger} from './loggers/console';
import {createGelfLogger} from './loggers/gelf';
import {createFileLogger} from './loggers/file';
import {environment} from './environment';

const d = debug('imperium.log');
const env = environment();

export enum LogTo {
	Console = 'console',
	File = 'file',
	Gelf = 'gelf',
}

export function configureLogger(logger: winston.Logger) {
	const logToArray = env.logTo.toLowerCase().split(',');

	logger.configure({
		level: env.level,
		defaultMeta: {
			deployment: env.deployment,
			app: env.appName,
			pid: process.pid,
		},
	});

	if (logToArray.includes(LogTo.Console)) {
		logger.add(createConsoleLogger());
	}

	if (logToArray.includes(LogTo.File)) {
		logger.add(createFileLogger({fileName: env.fileName}));
	}

	if (logToArray.includes(LogTo.Gelf)) {
		logger.add(createGelfLogger({proto: env.gelfProto, port: env.gelfPort, host: env.gelfHost}));
	}

	return logger;
}
