import React from 'react';
import {Menu, Dropdown} from 'semantic-ui-react';
import numberToName from 'number-to-date-month-name';
import {getMonthNames} from '../../../../date/src';

interface Props {
	values: {month: number | string, year: number | string},
	setFieldValue: (key: string, value: string | number) => {},
	fieldName: string,
	minYear?: number,
	maxYear?: number,
	numeric?: boolean,
}

/**
 * MonthYearDropdown
 * @param props
 * @constructor
 */
export default function MonthYearDropdown(props: Props) {
	const thisYear = new Date().getFullYear();
	const {values, setFieldValue, fieldName, minYear = 1970, maxYear = thisYear, numeric = false} = props;
	const hasMonth = !!values && !!values.month;
	const hasYear = !!values && !!values.year;

	const getOptions = () => {
		const array: {value: string, text: string, key: string}[] = [];
		for (let i = maxYear as number; i >= minYear; i--) {
			const yr = numeric ? i.toString().slice(2) : i.toString();
			array.push({value: yr, text: yr, key: yr});
		}
		return array;
	};

	let month = 'Month';
	let year = 'Year';
	if (hasYear) year = numeric ? values.year.toString().slice(2) : values.year.toString();
	if (hasMonth) month = numeric ? values.month.toString().padStart(2, '0') : numberToName.toMonth(values && values.month);

	return (
		<Menu compact>
			<Dropdown scrolling text={month} icon="" className="link item">
				<Dropdown.Menu key="month">
					{getMonthNames({}).map((item, index) => (
						<Dropdown.Item
							key={item}
							onClick={() => setFieldValue(`${fieldName}.month`, index + 1)}
						>{numeric ? (index + 1).toString().padStart(2, '0') : item}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
			<Dropdown
				icon=""
				scrolling
				text={year}
				className="link item"
				options={getOptions()}
				onChange={(c, p) => setFieldValue(`${fieldName}.year`, parseInt(p.value as string, 10))}
			/>
		</Menu>
	);
}
