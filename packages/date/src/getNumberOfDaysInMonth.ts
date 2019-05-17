interface GetMonthDaysParams {
	month: number,
	limitToCurrentDay?: boolean,
	asArray?: boolean,
}

/**
 * Returns the number of days in for a given month.
 * @param month: {number}, The number of the month to get where January = 1.
 * @param limitToCurrentDay = false: {boolean}, If set to true, returns number of days up to current day.
 * @param asArray = false: {boolean}, If set to true, returns array of days.
 */
export default function getMonthDays({month, limitToCurrentDay = false, asArray = false}: GetMonthDaysParams) {
	const days = (limitToCurrentDay && (month === new Date().getMonth() + 1))
		? new Date().getDate()
		: new Date(2019, month, 0).getDate();

	if (!asArray) return days;

	const daysArray: number[] = [];
	for (let i = 1; i <= days; i++) {
		daysArray.push(i);
	}
	return daysArray;
}
