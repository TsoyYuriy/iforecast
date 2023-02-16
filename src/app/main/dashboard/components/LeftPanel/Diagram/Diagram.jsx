import React from 'react'
import ReactApexChart from 'react-apexcharts'

const Diagram = ({title, series, options}) => {
    return (
        <div className="dashboard__left-diagramm">
            <h3 className='diagramm__title'>{title}</h3>

            <ReactApexChart
                series={series}
                options={options}
                type={'area'}
                height={250}
            />
        </div>
    )
}

export default Diagram
