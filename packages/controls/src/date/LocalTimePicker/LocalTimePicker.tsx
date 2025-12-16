import React, {type ReactElement} from 'react';
import DatePicker, {type ReactDatePickerProps} from 'react-datepicker';
import {type InputProps} from 'semantic-ui-react';
import {LocalTime} from '@js-joda/core';
import {toDate, toLocalTime} from '@thx/date';
import {debug} from 'debug';

const d = debug('thx.controls.date.LocalTimePicker');

/**
 * LocalTimePicker
 *
 * Goals / decisions
 * - Use react-datepicker's built-in input to avoid clone/ref races.
 * - Provide a single robust parser that accepts a wide variety of user input styles:
 *   - explicit "h:mm AM/PM" (preferred)
 *   - compact with suffix: "334pm", "1234AM", "5pm"
 *   - decimal hours: "5.5", "5,5", "5.5pm", "17.25"  (fraction -> minutes; rounded)
 *   - 24h colon "21:34"
 *   - HHMM "2145"
 *   - 3-digit compact "734" -> 7:34
 *   - hour-only "5" -> 05:00
 * - On blur: parse raw text; if parsed -> call onChange(parsed) and then call onBlur (deferred)
 *   so parent setFieldValue can finish before validation runs. If parse fails -> leave parent value,
 *   optionally revert visible text to the parent's display.
 *
 * - Minimal, readable logic; helper functions for rounding/clamping.
 */

/* ----------------------------- helpers ---------------------------------- */

function clamp(v: number, lo: number, hi: number): number {
	return Math.max(lo, Math.min(hi, v));
}

function formatLocalTime(localTime: LocalTime): string {
	const hours = localTime.hour();
	const minutes = localTime.minute();
	const period = hours >= 12 ? 'PM' : 'AM';
	const displayHour = hours % 12 || 12;
	return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Parse tolerant strings into LocalTime.
 *
 * Behavior details:
 * - Decimal hours: fraction -> minutes by rounding (Math.round). If mm === 60 after rounding,
 *   hour increments and minutes = 0.
 * - If decimal form includes am/pm suffix, interpret as 12-hour with suffix.
 * - If decimal form has no suffix, treat as 24-hour decimal when hours < 24.
 * - After computing, clamp hour to 0..23 and minutes to 0..59.
 *
 * Returns LocalTime or null if input cannot be parsed.
 */
export function parseTimeStringToLocalTime(str: string): LocalTime | null {
	if (!str) return null;

	// 1) explicit "h:mm AM/PM"
	let m = str.match(/^\s*(\d{1,2}):(\d{2})\s*(AM|PM)\s*$/i);
	if (m) {
		let hh = parseInt(m[1], 10);
		const mm = clamp(parseInt(m[2], 10), 0, 59);
		const period = (m[3] || '').toUpperCase();
		if (period === 'PM' && hh < 12) hh += 12;
		if (period === 'AM' && hh === 12) hh = 0;
		return LocalTime.of(clamp(hh, 0, 23), mm);
	}

	const raw = str.trim();

	// 2) decimal-hour with fraction (accept '.' or ','), optional am/pm
	//    e.g. "5.5", "5,5", "5.5pm", "17.25"
	const dec = raw.match(/^\s*([0-9]{1,2})([.,]([0-9]+))\s*(am|pm)?\s*$/i);
	if (dec) {
		let hh = parseInt(dec[1], 10);
		const fracDigits = dec[3] || '';
		const suffix = (dec[4] || '').toUpperCase();
		const fraction = fracDigits ? parseFloat(`0.${fracDigits}`) : 0;
		let mm = Math.round(fraction * 60); // rounding preferred

		// handle rounding overflow (e.g. .999 -> 60 minutes)
		if (mm === 60) {
			mm = 0;
			hh += 1;
		}

		if (suffix === 'PM' && hh < 12) hh += 12;
		if (suffix === 'AM' && hh === 12) hh = 0;

		hh = clamp(hh, 0, 23);
		mm = clamp(mm, 0, 59);
		return LocalTime.of(hh, mm);
	}

	// For the remaining checks normalize a compact form (remove dots/dashes/underscores/spaces)
	// but keep colon and letters.
	const s = raw.toLowerCase().replace(/[.\-_\s]+/g, '');

	// 3) compact suffix forms (digits + am/pm), support 1-4 digits:
	//    "5pm", "334pm", "1234am"
	m = s.match(/^([0-9]{1,4})(am|pm)$/i);
	if (m) {
		const digits = m[1];
		const suffix = (m[2] || '').toUpperCase();
		let hh = 0;
		let mm = 0;

		if (digits.length <= 2) {
			hh = parseInt(digits, 10);
		} else if (digits.length === 3) {
			hh = parseInt(digits.slice(0, 1), 10);
			mm = parseInt(digits.slice(1), 10);
		} else {
			hh = parseInt(digits.slice(0, 2), 10);
			mm = parseInt(digits.slice(2), 10);
		}

		mm = clamp(mm, 0, 59);
		if (suffix === 'PM' && hh < 12) hh += 12;
		if (suffix === 'AM' && hh === 12) hh = 0;
		return LocalTime.of(clamp(hh, 0, 23), mm);
	}

	// 4) hh[:mm][am|pm] (allow missing colon) - fallback
	m = s.match(/^([0-9]{1,2})(?::?([0-9]{1,2}))?(am|pm)$/i);
	if (m) {
		let hh = parseInt(m[1], 10);
		const mm = clamp(parseInt(m[2] || '0', 10), 0, 59);
		const suffix = (m[3] || '').toUpperCase();
		if (suffix === 'PM' && hh < 12) hh += 12;
		if (suffix === 'AM' && hh === 12) hh = 0;
		return LocalTime.of(clamp(hh, 0, 23), mm);
	}

	// 5) 24h colon "HH:MM"
	m = s.match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
	if (m) {
		return LocalTime.of(parseInt(m[1], 10), parseInt(m[2], 10));
	}

	// 6) four-digit compact "HHMM"
	m = s.match(/^([01]?\d|2[0-3])([0-5]\d)$/);
	if (m) return LocalTime.of(parseInt(m[1], 10), parseInt(m[2], 10));

	// 7) three-digit compact "734" -> 7:34
	m = s.match(/^(\d)(\d{2})$/);
	if (m) {
		const hh = clamp(parseInt(m[1], 10), 0, 23);
		const mm = clamp(parseInt(m[2], 10), 0, 59);
		return LocalTime.of(hh, mm);
	}

	// 8) hour-only "5" -> 05:00
	m = s.match(/^([0-9]{1,2})$/);
	if (m) {
		const hh = clamp(parseInt(m[1], 10), 0, 23);
		return LocalTime.of(hh, 0);
	}

	return null;
}

/* ----------------------------- component -------------------------------- */

interface ILocalTimePicker {
	value?: LocalTime | null;
	onChange?: (value: LocalTime | null) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement> | any) => void;
}

export type InputPropsOmitted = Omit<InputProps, 'onChange' | 'value'>;
export type ReactDatePickerPropsOmitted = Omit<Omit<ReactDatePickerProps, 'value'>, 'onChange' | 'onBlur'>;

export type LocalTimePickerProps = ILocalTimePicker & InputPropsOmitted & ReactDatePickerPropsOmitted;

export function LocalTimePicker(props: LocalTimePickerProps): ReactElement {
	const {value, onChange, onBlur, placeholder, name, ...rest} = props;

	const selected = value ? toDate(value) : null;

	return (
		<DatePicker
			{...rest}
			selected={selected}
			showTimeSelect
			showTimeSelectOnly
			timeIntervals={15}
			timeCaption="Time"
			dateFormat="hh:mm aa"
			name={name}
			placeholderText={placeholder ?? '...9:45AM'}
			onChange={date => {
				const lt = date ? toLocalTime(date) : null;
				onChange?.(lt);
			}}
			onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
				// Parse raw input and commit parsed value, then defer blur so parent validation
				// (e.g. Formik) sees the new value after setFieldValue completes.
				const raw = (e.target as HTMLInputElement).value;
				const parsed = parseTimeStringToLocalTime(raw);

				if (parsed) {
					onChange?.(parsed);
					setTimeout(() => {
						const synthetic: any = {target: {name, value: parsed}};
						onBlur?.(synthetic);
					}, 0);
				} else {
					// If parsing fails, leave parent value unchanged. Optionally revert the visible
					// text to the parent's display to avoid garbage staying in the field.
					const parentDisplay = value ? formatLocalTime(value) : '';
					try {
						(e.target as HTMLInputElement).value = parentDisplay;
					} catch {
						/* ignore DOM quirks */
					}
					setTimeout(() => {
						const synthetic: any = {target: {name, value: value ?? null}};
						onBlur?.(synthetic);
					}, 0);
				}
			}}
		/>
	);
}
