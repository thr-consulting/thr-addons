import {ChronoField, type LocalTime} from '@js-joda/core';

interface TimeOfDay {
	time: string;
	timeOfDay: string;
}

export function getTimeOfDay(time: LocalTime): TimeOfDay {
	return {
		time: time
			.get(ChronoField.CLOCK_HOUR_OF_AMPM)
			.toString()
			.concat(':', time.minute() < 10 ? '0' : '', time.minute().toString()),
		timeOfDay: time.hour() < 12 ? 'morning' : 'afternoon',
	};
}
