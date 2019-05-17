import React from 'react';
import {Menu, Dropdown} from 'semantic-ui-react';
import numberToName from 'number-to-date-month-name';
import {getMonthNames, getNumberOfDaysInMonth} from '../../../../date/src';

/**
 *
 * @param props
 * @constructor
 */
export default function MonthDayDropdown(props) {
	const {values, setFieldValue, fieldName} = props;
	return (
		<Menu>
			<Dropdown scrolling text={values.month ? numberToName.toMonth(values.month) : 'Month'} icon="" className="link item">
				<Dropdown.Menu key="month">
					{getMonthNames({}).map((item, index) => (
						<Dropdown.Item
							key={item}
							onClick={() => setFieldValue(`${[fieldName]}.month`, index + 1)}
						>
							{item}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
			<Dropdown scrolling text={values.day ? values.day.toString() : 'day'} icon="" className="link item" disabled={!values.month}>
				<Dropdown.Menu key="day">
					{getNumberOfDaysInMonth({month: values.month, asArray: true}).map(item => (
						<Dropdown.Item
							key={item}
							onClick={(e, r) => setFieldValue(`${[fieldName]}.day`, r.children)}
						>
							{item}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
		</Menu>
	);
}
