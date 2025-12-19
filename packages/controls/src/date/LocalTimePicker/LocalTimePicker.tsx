import {type ReactElement} from 'react';
import DatePicker, {type ReactDatePickerProps} from 'react-datepicker';
import {type InputProps} from 'semantic-ui-react';
import {LocalTime} from '@js-joda/core';
import {toDate, toLocalTime} from '@thx/date';

function formatLocalTime(localTime: LocalTime): string {
	const hours = localTime.hour();
	const minutes = localTime.minute();
	const period = hours >= 12 ? 'PM' : 'AM';
	const displayHour = hours % 12 || 12;
	return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/** Parse tolerant strings into LocalTime (supports shorthands, compact am/pm like "334pm", and 24h forms). */
export function parseTimeStringToLocalTime(str: string): LocalTime | null {
	if (!str) return null;

	// 1) already-normalized with AM/PM like "9:34 PM" or "09:34 AM"
	let m = str.match(/^\s*(\d{1,2}):(\d{2})\s*(AM|PM)\s*$/i);
	if (m) {
		let hh = parseInt(m[1], 10);
		const mm = parseInt(m[2], 10);
		const period = m[3].toUpperCase();
		if (period === 'PM' && hh < 12) hh += 12;
		if (period === 'AM' && hh === 12) hh = 0;
		return LocalTime.of(hh, mm);
	}

	const s = str
		.trim()
		.toLowerCase()
		.replace(/[.\-_,]/g, '')
		.replace(/\s+/g, '');

	// 2) compact suffix forms: digits + am|pm, supporting 1-4 digit prefixes:
	//    - "5pm" => 5:00 PM
	//    - "334pm" => 3:34 PM
	//    - "1234am" => 12:34 AM
	m = s.match(/^([0-9]{1,4})(am|pm)$/i);
	if (m) {
		const digits = m[1];
		const suffix = m[2].toUpperCase();
		let hh = 0;
		let mm = 0;

		if (digits.length <= 2) {
			// "5pm" or "05pm" => hour only
			hh = parseInt(digits, 10);
			mm = 0;
		} else if (digits.length === 3) {
			// "734pm" => 7:34
			hh = parseInt(digits.slice(0, 1), 10);
			mm = parseInt(digits.slice(1), 10);
		} else {
			// length === 4, "1234pm" => 12:34
			hh = parseInt(digits.slice(0, 2), 10);
			mm = parseInt(digits.slice(2), 10);
		}

		if (mm > 59) mm = 59;
		if (hh > 23) hh = 23;
		if (suffix === 'PM' && hh < 12) hh += 12;
		if (suffix === 'AM' && hh === 12) hh = 0;
		return LocalTime.of(hh, mm);
	}

	// 3) hh[:mm][am|pm] (e.g. "5pm", "05:30am") - fallback for colon + suffix
	m = s.match(/^([0-9]{1,2})(?::?([0-9]{1,2}))?(am|pm)$/i);
	if (m) {
		let hh = parseInt(m[1], 10);
		let mm = parseInt(m[2] || '0', 10);
		const suffix = m[3].toUpperCase();
		if (mm > 59) mm = 59;
		if (hh > 23) hh = 23;
		if (suffix === 'PM' && hh < 12) hh += 12;
		if (suffix === 'AM' && hh === 12) hh = 0;
		return LocalTime.of(hh, mm);
	}

	// 4) colon-separated 24h "HH:MM" (e.g. "21:34", "09:05")
	m = s.match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
	if (m) {
		const hh = parseInt(m[1], 10);
		const mm = parseInt(m[2], 10);
		return LocalTime.of(hh, mm);
	}

	// 5) Four-digit compact "HHMM" (e.g. "2145", "0945")
	m = s.match(/^([01]?\d|2[0-3])([0-5]\d)$/);
	if (m) return LocalTime.of(parseInt(m[1], 10), parseInt(m[2], 10));

	// 6) Three-digit compact like "734" -> 7:34
	m = s.match(/^(\d)(\d{2})$/);
	if (m) {
		let hh = parseInt(m[1], 10);
		let mm = parseInt(m[2], 10);
		if (hh > 23) hh = 23;
		if (mm > 59) mm = 59;
		return LocalTime.of(hh, mm);
	}

	// 7) hour-only "5" -> 05:00
	m = s.match(/^([0-9]{1,2})$/);
	if (m) {
		let hh = parseInt(m[1], 10);
		if (hh > 23) hh = 23;
		return LocalTime.of(hh, 0);
	}

	return null;
}

interface ILocalTimePicker {
	value?: LocalTime | null;
	onChange?: (value: LocalTime | null) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export type InputPropsOmitted = Omit<InputProps, 'onChange' | 'value'>;
export type ReactDatePickerPropsOmitted = Omit<Omit<ReactDatePickerProps, 'value'>, 'onChange' | 'onBlur'>;

export type LocalTimePickerProps = ILocalTimePicker & InputPropsOmitted & ReactDatePickerPropsOmitted;

export function LocalTimePicker(props: LocalTimePickerProps): ReactElement {
	const {value, onChange, onBlur, placeholder, name, className, error, ...rest} = props;

	// Map Semantic-UI error boolean to className + aria-invalid (avoid boolean prop on DOM)
	const extraClass = error ? `${className ?? ''} error`.trim() : className;
	const datepickerProps: Record<string, any> = {
		...rest,
		className: extraClass || undefined,
		'aria-invalid': error ? true : undefined,
		name,
	};

	const selected = value ? toDate(value) : null;

	return (
		<DatePicker
			{...datepickerProps}
			selected={selected}
			showTimeSelect
			showTimeSelectOnly
			timeIntervals={15}
			timeCaption="Time"
			dateFormat="hh:mm aa"
			placeholderText={placeholder ?? '...9:45AM'}
			onChange={date => {
				const lt = date ? toLocalTime(date) : null;
				onChange?.(lt);
			}}
			onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
				// read raw text
				const raw = (e.target as HTMLInputElement).value;
				const parsed = parseTimeStringToLocalTime(raw);

				if (parsed) {
					// 1) tell parent about the parsed value (parent will call setFieldValue)
					onChange?.(parsed);

					// 2) call the parent's onBlur (likely Formik.handleBlur) after the current call stack,
					// so setFieldValue has an opportunity to update Formik state before validation runs.
					// Pass a small synthetic event with name and value so Formik marks touched correctly.
					setTimeout(() => {
						const synthetic: any = {target: {name, value: parsed}};
						onBlur?.(synthetic);
					}, 0);
				} else {
					// If parsing failed, revert the visible input to the last parent value immediately
					const parentDisplay = value ? formatLocalTime(value) : '';
					try {
						(e.target as HTMLInputElement).value = parentDisplay;
					} catch {
						/* ignore */
					}

					// Then notify parent via onBlur after a tick so validation sees the (unchanged) parent value.
					setTimeout(() => {
						const synthetic: any = {target: {name, value: value ?? null}};
						onBlur?.(synthetic);
					}, 0);
				}
			}}
		/>
	);
}
