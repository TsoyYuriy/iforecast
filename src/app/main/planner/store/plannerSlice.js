import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const namespace = 'planner'

export const getDates = createAsyncThunk(`${namespace}/getDates`,
	async (_, {rejectWithValue}) => {
		try {
			const response = await axios.get('/scheduler');
			if (response.status !== 200) {
				throw new Error('Сервер не доступен');
			}
			const data = await response.data;
			return data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
)

export const addNewDate = createAsyncThunk(`${namespace}/addDate`,
	async (date, {dispatch, rejectWithValue}) => {
		try {
			const response = await axios.post('/scheduler', date);

			console.log(date);
			
			if (response.status !== 200) {
				throw new Error('Сервер не доступен');
			}
			dispatch(add(response.data));

		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const removeDate = createAsyncThunk(`${namespace}/removeDate`,
	async(id, {dispatch, rejectWithValue}) => {
		try {
			await axios.delete(`/scheduler/${id}`);
			dispatch(remove(id));
		} catch (err) {
			// return rejectWithValue(err.message);
		}
	}
)

const setError = (state, action) => {
	state.status = 'rejected';
	state.error = action.payload;
}

const plannerSlice = createSlice({
	name: namespace,
	initialState: {
		tableHeader: ['id', 'Дата отправки', 'Прогноз на период', 'Статус', 'Операции',],
		dataInfo: [], 
		status: null,
		error: null,
	},
	reducers: {
		add(state, action) {
			state.dataInfo.push(action.payload);
		},
		remove(state, action) {
			state.dataInfo = state.dataInfo.filter(date => date.id !== action.payload);
		}
	},
	extraReducers: {
		[getDates.pending]: (state) => {
			state.status = 'loading';
			state.error = null;
		},
		[getDates.fulfilled]: (state, action) => {
			state.status = 'resolved';
			state.dataInfo = action.payload;
		},
		[getDates.rejected ]: setError,
		[addNewDate.rejected ]: setError,
		[removeDate.rejected ]: setError,
	}
})

export const {add, remove} = plannerSlice.actions;

export default plannerSlice.reducer;
