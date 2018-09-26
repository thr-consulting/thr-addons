/**
 * A collection of form components designed with SemanticUI. They all adhere to React Formal's policy of having
 * a value prop and an onChange() prop.
 * */

// Inputs
import {Field, Button as SubmitButton} from 'react-formal';
import MaskedInput from './inputs/MaskedInput';
import SinEntry from './inputs/SinEntry';
import RadioGroup from './inputs/RadioGroup';

// Form
import SForm from './form/SForm';
import FieldMap from './form/FieldMap';
import TForm from './form/TForm';

// Menu
import ResponsiveMenu from './menu/ResponsiveMenu';

// Date
import DateTimePicker from './date/DateTimePicker';
import LocalDatePicker from './date/LocalDatePicker';
import EpochDatePicker from './date/EpochDatePicker';
import MonthSelect from './date/MonthSelect';
import LocalMonthSelect from './date/LocalMonthSelect';
import DatePicker from './date/DatePicker';
import {dateInit} from './date/util';

export {
	// Inputs
	RadioGroup,
	SubmitButton,
	MaskedInput,
	SinEntry,

	// Form
	SForm,
	FieldMap,
	Field,
	TForm,

	// Menu
	ResponsiveMenu,

	// Date
	DateTimePicker,
	LocalDatePicker,
	EpochDatePicker,
	MonthSelect,
	LocalMonthSelect,
	dateInit,
	DatePicker,
};
