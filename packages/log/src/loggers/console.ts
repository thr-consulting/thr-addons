import colors from 'colors/safe';
import {compact} from 'lodash-es';
import winston, {format} from 'winston';

export function createConsoleLogger() {
	return new winston.transports.Console({
		format: format.combine(
			format.colorize(),
			format.timestamp(),
			format.printf(info => {
				const fApp = `${colors.white(colors.bold(info.app))}`;
				const fSession = info.session ? `[${colors.yellow(colors.bold(info.session))}]` : `[${colors.yellow(colors.bold(`${info.pid}`))}]`;
				const fGroup = info.group ? `{${colors.white(colors.bold(info.group))}}` : null;
				const fLevel = `<${info.level}>`;
				const fStack = info.error?.stack ? `\n  ${info.error?.stack}` : null;
				return compact([colors.cyan(info.timestamp), `${fApp}${fSession}`, fGroup, fLevel, info.message, fStack]).join(' ');
			}),
		),
	});
}
