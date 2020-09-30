import {format} from 'winston';
import compact from 'lodash/compact';
import FileRotateTransport from 'fast-file-rotate';

export interface FileLoggerParams {
	fileName: string;
}

export function createFileLogger({fileName}: FileLoggerParams) {
	return new FileRotateTransport({
		fileName,
		dateFormat: 'YYYYMMDD',
		format: format.combine(
			format.timestamp(),
			format.printf(info => {
				return compact([
					info.timestamp,
					`${info.label}[session].${process.pid}:`,
					info.groupId ? `{${info.groupId}}` : null,
					`<${info.level}>`,
					info.message,
					info.stack ? `\n  ${info.stack}` : null,
				]).join(' ');
			}),
		),
	});
}