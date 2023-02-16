import React, {useState} from 'react'
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './DatePicker.css';


const Datepicker = (props) => {
	const [focusedInput, setFocusedInput] = useState(false)

	return (

		<SingleDatePicker
			date={props.date}
			onDateChange={date => props.onDateChange(date)}
			focused={focusedInput}
  		onFocusChange={() => setFocusedInput(!focusedInput)}
			displayFormat={'DD.MM.YYYY'}
			numberOfMonths={1}
			id="date"
			showDefaultInputIcon={true}
		/>
  );
}

export default Datepicker
