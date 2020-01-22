import React from 'react';
import {Menu, Dropdown} from 'semantic-ui-react';

interface Props {
	name: string,
	values: {hour?: number, minute?: number, ampm?: string},
	onBlur: (e: any) => void,
	setFieldValue: (name: string, value?: any) => void,
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
	// @ts-ignore
	const hasMinute = !!values && values.minute !== null && (values.minute > -1);
	const hasAmPm = !!values && values.ampm;

	return (
		<Menu compact>
			<Dropdown
				id={`${[name]}.hour`}
				scrolling
				// @ts-ignore
				text={hasHour ? values.hour.toString() : 'Hour'}
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
				// @ts-ignore
				text={hasMinute ? (values.minute < 10) ? '0'.concat(values.minute.toString()) : values.minute.toString() : 'minute'}// eslint-disable-line no-nested-ternary
				icon=""
				className="link item"
				onBlur={handleBlur}
				disabled={!hasHour}
				error={fieldError(`${[name]}.minute`)}
			>
				<Dropdown.Menu key="minute">
					{hasHour ? minutes.map(item => {
						const minute = (item < 10) ? '0'.concat((item).toString()) : item;
						return (
							<Dropdown.Item key={item} onClick={() => setFieldValue(`${[name]}.minute`, item)}>
								{minute}
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
