import {selectUser} from 'app/store/userSlice';
import React, {useState, useEffect} from 'react'
import {DateRangePicker} from 'react-dates';
import {Button} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {isAfterDay} from 'src/utils/isAfterDay';
import {getPingData} from "../../../store/dashboardSlice";

const LeftPanelHeader = () => {
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const [startDate, setStartDate] = useState(moment())
    const [endDate, setEndDate] = useState(moment())
    const [focusedInput, setFocusedInput] = useState()

    const orientation = window.matchMedia("(max-width: 1026px)").matches ? 'vertical' : 'horizontal'

    // call dispach to getPingData with startDate and endDate
    // startDate '2023-01-01', endDate '2023-01-01'
    // useEffect(() => {
    //     dispatch(getPingData({dateStart: '2023-01-01', dateEnd: '2023-01-01'}))
    // }, [])

    const handleDateChange = (startDate, endDate) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }

    const getDate = (startDate, endDate) => {
			const date = {
				dateStart: moment(startDate).format('YYYY-MM-DD'),
				dateEnd: moment(endDate).format('YYYY-MM-DD')
			}
			dispatch(getPingData(date));
    };

    useEffect(() => {
			const date = {
				dateStart: moment(startDate).format('YYYY-MM-DD'),
				dateEnd: moment(endDate).format('YYYY-MM-DD')
			}
			dispatch(getPingData(date));
    }, []);

    return (
        <div className="dashboard__left-header">
            <h1 className='dashboard__title'>{user.data.stationName}</h1>

            <div className="dashboard__left-info">
                <p className='dashboard__text dashboard__text--mobile'>Выберите период</p>

                <DateRangePicker
                    startDate={startDate}
                    startDateId="start_date_id"
                    endDate={endDate}
                    endDateId="end_date_id"
                    onDatesChange={({startDate, endDate}) =>
                        handleDateChange(startDate, endDate)
                    }
                    focusedInput={focusedInput}
                    onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
                    displayFormat={'DD.MM.YYYY'}
                    isOutsideRange={day => isAfterDay(day, moment())}
                    onClose={({startDate, endDate}) => getDate(startDate, endDate)}
                    orientation={orientation}
                />

                <Button className='dashboard__left-btn'>Отчет Excel</Button>
            </div>
        </div>
    )
}

export default LeftPanelHeader
