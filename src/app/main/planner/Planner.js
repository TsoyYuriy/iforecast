import React, {useState, useEffect} from 'react';
import './Planner.css';
import DateRangepicker from 'app/theme-layouts/layout4/customComponents/DateRangePicker/DateRangePicker';
import {useDispatch, useSelector} from 'react-redux';
import { addNewDate, getDates } from 'src/app/main/planner/store/plannerSlice';
import Button from 'app/theme-layouts/layout4/customComponents/UI/Button/Button';
import Datepicker from 'app/theme-layouts/layout4/customComponents/DatePicker/DatePicker';
import moment from 'moment';
import {selectUser} from "app/store/userSlice";
import TablePlanner from 'app/theme-layouts/layout4/customComponents/TablePlanner/TablePlanner';
import { isBeforeDay } from 'src/utils/isBeforeDay';

function Planner() {
  
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [parentFormatDate, setParentFormatDate] = useState('');
  const [datePickerValue, setDatePickerValue] = useState(moment());

  const [startDate, setStartDate] = useState(moment())
	const [endDate, setEndDate] = useState(moment())

	const orientation = window.matchMedia("(max-width: 700px)").matches ? 'vertical' : 'horizontal'


  const handleChangeDateRangePicker = (startDate, endDate) => {
		setStartDate(startDate)
		setEndDate(endDate)
  }

  const handleChangeDatePicker = (date) => {
    setDatePickerValue(date)
    setParentFormatDate(date);
    setStartDate(date)
	};
  
  const sendData = (e) => { 
    e.preventDefault();
    const newDate = {
      dateOfSend: parentFormatDate,
      forecastStart: startDate,
      forecastEnd: endDate,
    }
    dispatch(addNewDate(newDate));
  };

  useEffect(() => {
		dispatch(getDates());
    setParentFormatDate(new Date());
  }, [dispatch]);

  return (
    <div className="planner-wrap">
      <div className="planner w-full h-full p-24">
        <h1 className='planner__title'>Планировщик</h1>

        <div className="planner__station">
          <span>Станция</span>
          <span>{user.data.stationName}</span>
        </div>
        <span className='line'></span>

        <form className='planner__form' onSubmit={sendData}>
          <div>
            <div className="inputs">
              <div className="inputs__title">
                <span>1</span>
                <span>Укажите дату отчета</span>
              </div>

              <div className="input-wrap input-wrap--utils">
                  <Datepicker
                    date={datePickerValue}
                    onDateChange={handleChangeDatePicker}
                  />
              </div>

              <div className="inputs__title">
                <span>2</span>
                <span>Укажите прогноз на период</span>
              </div>

              <div className="input-wrap">
                  <DateRangepicker
                    startDate={startDate}
                    endDate={endDate}
                    handleDateChange={handleChangeDateRangePicker}
                    orientation={orientation}
                    isOutsideRange={day => isBeforeDay(day, datePickerValue)}
                  />
              </div>
            </div>

            <Button 
              className='inputs__btn'
            >Добавить</Button>
          </div>
        </form>

        <span className='line'></span>
        <TablePlanner/>
      </div>
    </div>
  );
}

export default Planner;
