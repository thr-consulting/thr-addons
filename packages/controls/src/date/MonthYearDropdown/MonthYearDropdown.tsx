import React from 'react';
import {Menu, Dropdown} from 'semantic-ui-react';
import numberToName from 'number-to-date-month-name';
import {getMonthNames} from '../../../../date/src';

interface Props {
	value: {month: number | string, year: number | string},
	setFieldValue: (key: string, value: string | number) => {},
	name: string,
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
	const {value, setFieldValue, name, minYear = 1970, maxYear = new Date().getFullYear(), numeric = false} = props;
	const hasMonth = !!value && !!value.month;
	const hasYear = !!value && !!value.year;

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
	if (hasYear) year = numeric ? value.year.toString().slice(2) : value.year.toString();
	if (hasMonth) month = numeric ? value.month.toString().padStart(2, '0') : numberToName.toMonth(value && value.month);

	return (
		<Menu compact>
			<Dropdown scrolling text={month} icon="" className="link item">
				<Dropdown.Menu key="month">
					{getMonthNames({}).map((item, index) => (
						<Dropdown.Item
							key={item}
							onClick={() => setFieldValue(`${name}.month`, index + 1)}
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
				onChange={(c, p) => setFieldValue(`${name}.year`, parseInt(p.value as string, 10))}
			/>
		</Menu>
	);
}
