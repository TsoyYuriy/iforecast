import React, {useState, useEffect} from 'react'
import {selectMeteoInfo, getMeteoInfo} from "../../store/dashboardSlice";
import {useDispatch, useSelector} from "react-redux";

const RightTopPanel = () => {
	const dispatch = useDispatch();

	const [data, setData] = useState({})
	const meteoInfo = useSelector(selectMeteoInfo)

	useEffect(() => {
		dispatch(getMeteoInfo())
	}, []);


	useEffect(() => {
		setData({
			currentTemp: meteoInfo.currentTemp,
			currentClouds: meteoInfo.currentClouds,
			currentIrradiation: meteoInfo.currentIrradiation,
			currentWind: meteoInfo.currentWind,
		})
	}, [meteoInfo]);
	
	return (
		<div className="dashboard__right-top">
			<h2>Текущие метиоданные</h2>

			<div className="right-top__info">

				<div className="right-top__text">
					<p className='dashboard__text'>Температура</p>
					<p className='data'>{Math.ceil(data.currentTemp)} °C</p>
				</div>

				<div className="right-top__text">
					<p className='dashboard__text'>Облачность</p>
					<p className='data'>{Math.ceil(data.currentClouds)} %</p>
				</div>

				<div className="right-top__text">
					<p className='dashboard__text'>Иррадация</p>
					<p className='data'>{Math.ceil(data.currentIrradiation)} кВтч/м²</p>
				</div>

				<div className="right-top__text">
					<p className='dashboard__text'>Скорость ветра</p>
					<p className='data'>{Math.ceil(data.currentWind)} м/c</p>
				</div>

			</div>
		</div>
	)
}

export default RightTopPanel
