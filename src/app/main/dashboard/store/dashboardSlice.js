import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// getMetioInfo is an async action creator
export const getMeteoInfo = createAsyncThunk(
    'dashboard/getMetioInfo',
    async () => {
        const response = await axios.get('/currentMeteoInfo');
        return response.data;
    });

export const getPingData = createAsyncThunk(
    'dashboard/ping',
    async ({dateStart, dateEnd}) => {
        const response = await axios.get('dashboard/ping', {
            params: {
                dateStart: dateStart,
                dateEnd: dateEnd
            }
        })

        const data = await response.data;
        return data;
    });

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        meteoInfo: {},
        data: {},
        flowGraphSource: 'graphProduce',
        loading: false,
    },
    reducers: {
        handleSelect(state, action) {
            state.flowGraphSource = action.payload;
        },
        loader(state, action) {
            console.log(action.payload);
            state.loading = action.payload
        },
    },
    extraReducers: {
        [getPingData.fulfilled]: (state, action) => {
            state.data = action.payload
        },
        [getMeteoInfo.fulfilled]: (state, action) => {
            state.meteoInfo = action.payload
        },
    },
});
export const selectDashboardData = ({fuse}) => fuse.dashboard.data;
export const selectMeteoInfo = ({fuse}) => fuse.dashboard.meteoInfo;
export const flowGraph = ({fuse}) => fuse.dashboard.flowGraphSource;
export const loading = ({fuse}) => fuse.dashboard.loading;

export const {handleSelect, loader} = dashboardSlice.actions;
export default dashboardSlice.reducer