import memoize from 'lodash/memoize';

export const environment = memoize(() => ({
	deployment: process.env.LOG_DEPLOYMENT || 'Development',
	appName: process.env.LOG_APP || 'Test',
	logTo: process.env.LOG_TO || 'console',
	level: process.env.LOG_LEVEL || 'info',
	gelfHost: process.env.LOG_GELF_HOST || '127.0.0.1',
	gelfProto: (process.env.LOG_GELF_PROTO || 'udp') as 'udp' | 'tcp' | 'tcp-tls',
	gelfPort: parseInt(process.env.LOG_GELF_PORT || '12201', 10),
	fileName: process.env.LOG_FILE_NAME || 'winston-%DATE%.log',
}));
