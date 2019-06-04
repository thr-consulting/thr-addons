import React, {useState} from 'react';
import {Menu, Dropdown, Transition} from 'semantic-ui-react';
import numberToName from 'number-to-date-month-name';
import {getMonthNames, getNumberOfDaysInMonth} from '../../../../date/src';

/**
 *
 * @param props
 * @constructor
 */
export default function MonthDayDropdown(props) {
	const [visible, setVisible] = useState(true);
	const {values, setFieldValue, fieldName} = props;
	const hasMonth = !!values && !!values.month;
	const hasDay = !!values && !!values.day;

	return (
		<Menu compact>
			<Dropdown scrolling text={hasMonth ? numberToName.toMonth(values.month) : 'Month'} icon="" className="link item">
				<Dropdown.Menu key="month">
					{getMonthNames({}).map((item, index) => (
						<Dropdown.Item
							key={item}
							onClick={() => {
								setFieldValue(`${[fieldName]}.month`, index + 1);
								const days = getNumberOfDaysInMonth({month: index + 1});
								// when the month is changed, and the day value is to high for this month,
								// then the day value is changed to the highest available day of that month.
								// This also triggers the animation to make the changed day value blink.
								if (hasDay && days < values.day) {
									setFieldValue(`${[fieldName]}.day`, days);
									setVisible(!visible);
								}
							}}
						>
							{item}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
			<Transition visible={visible} animation="flash" duration={900}>
				<Dropdown scrolling text={hasDay ? values.day.toString() : 'day'} icon="" className="link item" disabled={!hasMonth}>
					<Dropdown.Menu key="day">
						{hasMonth ? getNumberOfDaysInMonth({month: values.month, asArray: true}).map(item => (
							<Dropdown.Item
								key={item}
								onClick={(e, r) => setFieldValue(`${[fieldName]}.day`, r.children)}
							>
								{item}
							</Dropdown.Item>
						)) : null}
					</Dropdown.Menu>
				</Dropdown>
			</Transition>
		</Menu>
	);
}
