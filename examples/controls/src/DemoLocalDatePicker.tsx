import {LocalDatePicker} from '@thx/controls';
import {LocalDate} from '@js-joda/core';
import 'react-datepicker/dist/react-datepicker.css';

export function DemoLocalDatePicker() {
	return <LocalDatePicker value={LocalDate.now()} />;
}
