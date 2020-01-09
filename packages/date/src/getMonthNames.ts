interface GetMonthNameParams {
	year?: number;
	limitToCurrentMonth?: boolean;
}

/**
 * Returns an array of month name strings up to the current month.
 * @param year: {number}, The year to get the months for.
 * @param limitToCurrentMonth = false: {boolean}, If set to true returns all the months for the current year.
 */
export function getMonthNames({year, limitToCurrentMonth = true}: GetMonthNameParams = {}): string[] {
	const array = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const date = new Date();
	const currentYear = date.getFullYear();
	const currentMonth = date.getMonth();

	if (year) {
		if (year > currentYear) return [];
		if (year === currentYear && limitToCurrentMonth) {
			return array.slice(0, currentMonth + 1);
		}
	}
	return array;
}
