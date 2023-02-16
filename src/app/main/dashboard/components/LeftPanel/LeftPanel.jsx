import React, {useEffect, useState} from 'react'
import Diagram from './Diagram/Diagram'
import LeftPanelHeader from './LeftPanelHeader/LeftPanelHeader'
import {useDispatch, useSelector} from "react-redux";
import {flowGraph, loader, loading, selectDashboardData} from '../../store/dashboardSlice';


const LeftPanel = () => {

  const dispatch = useDispatch();
  const dashboardData = useSelector(selectDashboardData)
  const dataDiagram = useSelector(flowGraph)
  const startLoader = useSelector(loading)

  const graphOptionsTemplate = {
      chart: {
          toolbar: {
              autoSelected: "zoom",
              show: true,
              tools: {
                  download: false,
                  zoomout: false,
                  zoomin: false
              }
          },
          background: "#fff"
      },
      dataLabels: {
          enabled: false
      },
      xaxis: {
          type: "datetime",
          categories: []
      },
      fill: {
          type: 'gradient',
      },
      yaxis: {
          labels: {
              formatter: function (value) {
                  return value
              },
          }
      },
      stroke: {
          width: 1.5 // размер линии диаграммы
      },
      legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'left',
      },
      tooltip: {
          shared: true,
          x: {
              format: "dd MMM - HH : mm "
          }
      }
  };
  const selectOptionsTitle = {
      graphProduce: {forecast: 'prognozfakt_graph_fc', fact: 'prognozfakt_graph_his'},
      graphTemperature: {forecast: 'meteo_t_graph_fc', fact: 'meteo_t_graph_his'},
      graphCloudiness: {forecast: 'meteo_c_graph_fc', fact: 'meteo_c_graph_his'},
      graphIrradiation: {forecast: 'meteo_h_graph_fc', fact: 'meteo_h_graph_his'},
      graphWind: {forecast: 'meteo_w_graph_fc', fact: 'meteo_w_graph_his'},
  }

  const [flowSeries, setFlowSeries] = useState([])
  const [flowOptions, setFlowOptions] = useState(graphOptionsTemplate)

  const [todaySeries, setTodaySeries] = useState([])
  const [todayOptions, setTodayOptions] = useState(graphOptionsTemplate)

  useEffect(() => {
    dispatch(loader(true))
    if (todaySeries.length === 0 && dashboardData && dashboardData.prognozfakt_graph_dt) {
      setTodayOptions(prevState => {
        return {
          ...prevState,
          xaxis: {
            type: "datetime",
            categories: dashboardData.prognozfakt_graph_dt
          }
        }
      })

      setTodaySeries(
        [
          {name: 'Прогноз', color: '#7BD8F1', data: dashboardData.prognozfakt_graph_fc},
          {name: 'Факт', color: '#E88532', data: dashboardData.prognozfakt_graph_his},
        ]
      )
    }

    // --------------------------------
    // console.log('UseEffect LeftPanel')
    // console.log('da', dataDiagram)
    setFlowOptions(prevState => {
      return {
        ...prevState,
        xaxis: {
            type: "datetime",
            categories: dashboardData.prognozfakt_graph_dt
        }
      }
    })

    setFlowSeries(
      [
        {name: 'Прогноз', color: '#7BD8F1', data: dashboardData[selectOptionsTitle[dataDiagram].forecast]},
        {name: 'Факт', color: '#E88532', data: dashboardData[selectOptionsTitle[dataDiagram].fact]},
      ]
    )
    dispatch(loader(false))
  }, [dashboardData, dataDiagram])

  return (
      <div className="dashboard__left">
          <LeftPanelHeader/>

          <span className='line'></span>

        {
          startLoader 
          ? <h1 className='loading'>Loading...</h1> 
          : <Diagram
              title={'Общая выработка'}
              series={flowSeries}
              options={flowOptions}
            />
        }

          <span className='line line-top'></span>

          {
            startLoader 
            ? <h1 className='loading'>Loading...</h1> 
            : <Diagram
                title={'Текущая выработка'}
                series={todaySeries}
                options={todayOptions}
              />
          }

      </div>
  )
}

export default LeftPanel
