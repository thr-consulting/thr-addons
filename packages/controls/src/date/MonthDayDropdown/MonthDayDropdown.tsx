import React, {useState} from 'react';
import {Menu, Dropdown, Transition} from 'semantic-ui-react';
import numberToName from 'number-to-date-month-name';
import {getMonthNames, getNumberOfDaysInMonth} from '../../../../date/src';

interface Props {
	value,
	name: string,
	numeric?: boolean,
	setFieldValue: (name: string, value) => void,
}


/**
 *
 * @param props
 * @constructor
 */
export default function MonthDayDropdown(props: Props) {
	const [visible, setVisible] = useState(true);
	const {value, setFieldValue, name, numeric} = props;
	const hasMonth = !!value && !!value.month;
	const hasDay = !!value && !!value.day;

	let month = 'Month';
	let day = 'Day';
	if (hasDay) day = numeric ? value.day.toString().padStart(2, '0') : value.day.toString();
	if (hasMonth) month = numeric ? value.month.toString().padStart(2, '0') : numberToName.toMonth(value && value.month);

	return (
		<Menu compact>
			<Dropdown scrolling text={month} icon="" className="link item">
				<Dropdown.Menu key="month">
					{getMonthNames({}).map((item, index) => (
						<Dropdown.Item
							key={item}
							onClick={() => {
								setFieldValue(`${[name]}.month`, index + 1);
								const days = getNumberOfDaysInMonth({month: index + 1});
								// when the month is changed, and the day value is to high for this month,
								// then the day value is changed to the highest available day of that month.
								// This also triggers the animation to make the changed day value blink.
								if (hasDay && days < value.day) {
									setFieldValue(`${[name]}.day`, days);
									setVisible(!visible);
								}
							}}
						>
							{numeric ? (index + 1).toString().padStart(2, '0') : item}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
			<Transition visible={visible} animation="flash" duration={900}>
				<Dropdown scrolling text={day} icon="" className="link item" disabled={!hasMonth}>
					<Dropdown.Menu key="day">
						{hasMonth ? getNumberOfDaysInMonth({month: value.month, asArray: true}).map(item => (
							<Dropdown.Item
								key={item}
								onClick={(e, r) => setFieldValue(`${[name]}.day`, r.children)}
							>
								{item.toString().padStart(2, '0')}
							</Dropdown.Item>
						)) : null}
					</Dropdown.Menu>
				</Dropdown>
			</Transition>
		</Menu>
	);
}
