import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { flowGraph, handleSelect, selectDashboardData } from '../../store/dashboardSlice'
import Widget from './Widget/Widget'

const RightBottomPanel = () => {

	const dispatch = useDispatch();
	const dashboardData = useSelector(selectDashboardData);
	const dataDiagram = useSelector(flowGraph);

	const dataWidget = [
		{
			img: 'assets/customImages/justification-icon.png',
			title: 'Оправдываемость',
			data: Math.ceil(dashboardData.prognozfakt),
			dataName: '%',
		},
		{
			img: 'assets/customImages/output-icon.png',
			title: 'Общая выработка',
			data: Math.ceil(dashboardData.power_graph_his),
			dataName: 'кВт*ч',

		},
		{
			img: 'assets/customImages/kium-icon.png',
			title: 'КИУМ',
			data: Math.ceil(dashboardData.kium_graph_his),
			dataName: '%',
		},
		{
			img: 'assets/customImages/tech.png',
			title: 'Техническая готовность',
			data: 100,
			dataName: '%',
		},
		{
			img: 'assets/customImages/currentOutput.png',
			title: 'Текущая выработка',
			data: 0,
			dataName: 'Квт*ч',
		},
		{
			img: 'assets/customImages/money-icon.png',
			title: 'Доход',
			data: Math.ceil(dashboardData.totalProduceIncome),
			dataName: 'ТГ',
		},
		{
			img: 'assets/customImages/co2-icon.png',
			title: 'Снижение выбросов СО2',
			data: Math.ceil(dashboardData.totalCoReduction),
			dataName: 'тонн',
		},
	]

	return (
		<div className="dashboard__right-bottom">

			<Widget 
				src={'assets/customImages/icon-cloud.png'}
				title={'Метеоданные'}
			>
				<select 
					value={dataDiagram} 
					onChange={
						(e) => dispatch(handleSelect(e.target.value))
					}
					className={'box'}
				>
					<option value='graphProduce'>Выработка (мВт*ч)</option>
					<option value='graphTemperature'>Температура воздуха (°C)</option>
					<option value='graphCloudiness'>Облачность (%)</option>
					<option value='graphIrradiation'>Иррадиация (кВтч/м²)</option>
					<option value='graphWind'>Скорость ветра (м/с)</option>
				</select>
			</Widget>

			{
				dataWidget.map( (data, i) => {
					return <Widget
									key={i}
									src={data.img}
									title={data.title}
								>
									{`${data.data} ${data.dataName}`}
								</Widget>
				})
			}
		</div>
	)
}

export default RightBottomPanel
