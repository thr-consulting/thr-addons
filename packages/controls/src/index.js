/**
 * A collection of form components designed with SemanticUI. They all adhere to React Formal's policy of having
 * a value prop and an onChange() prop.
 * */

// Inputs
import MaskedInput from './inputs/MaskedInput';
import SinEntry from './inputs/SinEntry';
import RadioGroup from './inputs/RadioGroup';

// Form
import FieldMap from './form/FieldMap';
import TForm from './form/TForm';
import ScriptelInput from './inputs/ScriptelInput';
import Scriptel from './inputs/Scriptel/Scriptel';
import withScriptel from './inputs/Scriptel/withScriptel';

// Menu
import ResponsiveMenu from './menu/ResponsiveMenu';

// Date
import LocalMonthSelect from './date/LocalMonthSelect';
import DatePicker from './date/DatePicker';

// Money
import MoneyInput from './money/MoneyInput';
import MoneyInputMask from './money/MoneyInputMask';

export {
	// Inputs
	RadioGroup,
	MaskedInput,
	SinEntry,

	// Form
	FieldMap,
	TForm,
	ScriptelInput,
	Scriptel,
	withScriptel,

	// Menu
	ResponsiveMenu,

	// Date
	LocalMonthSelect,
	DatePicker,

	// Money
	MoneyInput,
	MoneyInputMask,
};
