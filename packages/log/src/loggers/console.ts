import chalk from 'chalk';
import {compact} from 'lodash-es';
import winston, {format} from 'winston';

export function createConsoleLogger() {
	return new winston.transports.Console({
		format: format.combine(
			format.colorize(),
			format.timestamp(),
			format.printf(info => {
				const error = info.error as Error | undefined;
				const fApp = `${chalk.white(chalk.bold(info.app))}`;
				const fSession = info.session ? `[${chalk.yellow(chalk.bold(info.session))}]` : `[${chalk.yellow(chalk.bold(`${info.pid}`))}]`;
				const fGroup = info.group ? `{${chalk.white(chalk.bold(info.group))}}` : null;
				const fLevel = `<${info.level}>`;
				const fStack = error?.stack ? `\n  ${error?.stack}` : null;
				return compact([chalk.cyan(info.timestamp), `${fApp}${fSession}`, fGroup, fLevel, info.message, fStack]).join(' ');
			}),
		),
	});
}
