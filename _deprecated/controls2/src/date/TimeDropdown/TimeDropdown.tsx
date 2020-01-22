import React, {KeyboardEvent} from 'react';
import {Menu, Dropdown, DropdownProps} from 'semantic-ui-react';

interface Props {
	name: string,
	values: {hour?: number, minute?: number, ampm?: string},
	onBlur: (e: KeyboardEvent<HTMLElement>, data: DropdownProps) => void,
	setFieldValue: (name: string, value?: number | string) => void,
	fieldError: (name: string) => boolean,
}

/**
 * TimeDropdown
 * @param props: Props
 * @constructor
 */
export default function TimeDropdown(props: Props) {
	const {values, setFieldValue, name, onBlur: handleBlur, fieldError} = props;
	const hours = Array.from(Array(12).keys());
	const minutes = Array.from(Array(60).keys());
	const hasHour = !!values && !!values.hour;
	const hasAmPm = !!values && values.ampm;
	let hasMinute = false;
	let minuteText = 'Minute';
	let hourText = 'Hour';

	if (values && values.minute !== undefined && values.minute >= 0) {
		minuteText = (values.minute < 10) ? values.minute.toString().padStart(2, '0') : values.minute.toString();
		hasMinute = true;
	}
	if (values && values.hour) hourText = values.hour.toString();

	return (
		<Menu compact>
			<Dropdown
				id={`${[name]}.hour`}
				scrolling
				text={hourText}
				icon=""
				className="link item"
				onBlur={handleBlur}
				error={fieldError(`${[name]}.hour`)}
			>
				<Dropdown.Menu key="hour">
					{hours.map(item => (
						<Dropdown.Item key={item} onClick={() => setFieldValue(`${[name]}.hour`, (item + 1))}>
							{item + 1}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
			<Dropdown
				id={`${[name]}.minute`}
				scrolling
				text={minuteText}
				icon=""
				className="link item"
				onBlur={handleBlur}
				disabled={!hasHour}
				error={fieldError(`${[name]}.minute`)}
			>
				<Dropdown.Menu key="minute">
					{hasHour ? minutes.map(item => {
						const min = (item < 10) ? item.toString().padStart(2, '0') : item;
						return (
							<Dropdown.Item key={item} onClick={() => setFieldValue(`${[name]}.minute`, item)}>
								{min}
							</Dropdown.Item>
						);
					}) : null}
				</Dropdown.Menu>
			</Dropdown>
			<Dropdown
				id={`${[name]}.ampm`}
				text={hasAmPm ? values.ampm : 'AM/PM'}
				icon=""
				className="link item"
				onBlur={handleBlur}
				disabled={!hasMinute}
				error={fieldError(`${[name]}.ampm`)}
			>
				<Dropdown.Menu>
					<Dropdown.Item key="am" onClick={() => setFieldValue(`${[name]}.ampm`, 'AM')}>
						AM
					</Dropdown.Item>
					<Dropdown.Item key="pm" onClick={() => setFieldValue(`${[name]}.ampm`, 'PM')}>
						PM
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</Menu>
	);
}
