import React, {useState} from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './DateRangePicker.css';

const DateRangepicker = (props) => {
	const [focusedInput, setFocusedInput] = useState()

	return (
		<DateRangePicker
			startDate={props.startDate}
			startDateId="start_date_id" 
			endDate={props.endDate}
			endDateId="end_date_id" 
			onDatesChange={({ startDate, endDate }) =>
        props.handleDateChange(startDate, endDate)
      }
			focusedInput={focusedInput}
			onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
			displayFormat={'DD.MM.YYYY'}
			orientation={props.orientation}
			isOutsideRange={props.isOutsideRange}
		/>
	)
}

export default DateRangepicker
