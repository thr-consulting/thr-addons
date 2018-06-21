import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerLocalDate from '../DatePicker.LocalDate';
import DatePickerEpochDate from '../DatePicker.EpochDate';

DatePicker.LocalDate = DatePickerLocalDate;
DatePicker.EpochDate = DatePickerEpochDate;

export default DatePicker;
