declare module 'gelf-pro' {

	export interface Logger {
		emergency(message: Message, extra?: MessageExtra, callback?: MessageCallback): void;
		alert(message: Message, extra?: MessageExtra, callback?: MessageCallback): void;
		critical(message: Message, extra?: MessageExtra, callback?: MessageCallback): void;
		error(message: Message, extra?: MessageExtra, callback?: MessageCallback): void;
		warning(message: Message, extra?: MessageExtra, callback?: MessageCallback): void;
		warn(message: Message, extra?: MessageExtra, callback?: MessageCallback): void;
		notice(message: Message, extra?: MessageExtra, callback?: MessageCallback): void;
		info(message: Message, extra?: MessageExtra, callback?: MessageCallback): void;
		debug(message: Message, extra?: MessageExtra, callback?: MessageCallback): void;
		log(message: Message, extra?: MessageExtra, callback?: MessageCallback): void;
	}
}
