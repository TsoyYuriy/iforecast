import mock from '../mock';
// ----------------------------------------------------------------------

mock.onGet('/currentMeteoInfo').reply(() => {
    const currentClouds = Math.random() * 10;
    const currentIrradiation = Math.random() * 1000;
    const currentTemp = Math.random() * 100 - 50;
    const currentWind = Math.random() * 100;

    return [200, {currentClouds, currentIrradiation, currentTemp, currentWind}];
});

mock.onGet('dashboard/ping').reply((config) => {
    const {dateStart, dateEnd} = config.params
    if (dateStart && dateEnd) {
        let dataTemplate = {
            "prognozfakt_graph_dt": [],
            "prognozfakt_graph_fc": [],
            "prognozfakt_graph_his": [],
            "meteo_t_graph_fc": [],
            "meteo_t_graph_his": [],
            "meteo_c_graph_fc": [],
            "meteo_c_graph_his": [],
            "meteo_h_graph_fc": [],
            "meteo_h_graph_his": [],
            "meteo_w_graph_fc": [],
            "meteo_w_graph_his": [],
            "totalProduceIncome": 0,
            "totalCoReduction": 0,
            "prognozfakt": "NaN",
            "power_graph_his": 0.0,
            "kium_graph_his": "NaN"
        }

        let getTimeDifferenceResult = getTimeDifference(dateStart, dateEnd)
        dataTemplate.prognozfakt_graph_dt = getTimeDifferenceResult;

        // Fill dataTemplate with random data
        for (let i = 0; i < getTimeDifferenceResult.length; i++) {
            dataTemplate.prognozfakt_graph_fc.push(Math.random() * 100);
            dataTemplate.prognozfakt_graph_his.push(Math.random() * 100);
            dataTemplate.meteo_t_graph_fc.push(Math.random() * 100);
            dataTemplate.meteo_t_graph_his.push(Math.random() * 100);
            dataTemplate.meteo_c_graph_fc.push(Math.random() * 100);
            dataTemplate.meteo_c_graph_his.push(Math.random() * 100);
            dataTemplate.meteo_h_graph_fc.push(Math.random() * 100);
            dataTemplate.meteo_h_graph_his.push(Math.random() * 100);
            dataTemplate.meteo_w_graph_fc.push(Math.random() * 100);
            dataTemplate.meteo_w_graph_his.push(Math.random() * 100);
        }

        // fill totalProduceIncome and totalCoReduction...
        dataTemplate.totalProduceIncome = Math.random() * 100;
        dataTemplate.totalCoReduction = Math.random() * 100;
        dataTemplate.prognozfakt = Math.random() * 100;
        dataTemplate.power_graph_his = Math.random() * 100;
        dataTemplate.kium_graph_his = Math.random() * 100;

        return [200, dataTemplate]
    } else {
        return [400, {error: 'dateStart and dateEnd are required'}]
    }
})

// ----------------------------------------------------------------------
function getTimeDifference(dateStart, dateEnd) {
    const start = new Date(`${dateStart}T00:00:00Z`);
    const end = new Date(`${dateEnd}T00:00:00Z`);
    const difference = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
    console.log(difference)
    let current = start;
    const result = [];
    for (let i = 0; i < difference * 24; i++) {
        result.push(current.toISOString().slice(0, 19).replace('T', ' '));
        current.setHours(current.getHours() + 1);
    }
    return result;
}
