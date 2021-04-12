import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import notification from 'api/notificationApi';

export const getNotificatons = createAsyncThunk(
	'/notification/get',
	async () => {
		try {
			const response = await notification.getNotifications();
			return response.notifications;
		} catch (error) {
			console.log(error);
		}
	}
);

export const updateNotiSeen = createAsyncThunk(
	'/notification/seen',
	async () => {
		try {
			const response = await notification.updateNotiSeen();
			return response.notifications;
		} catch (error) {
			console.log(error);
		}
	}
);

const notificationSlice = createSlice({
	name: 'notifications',
	initialState: {
		notificationList: [],
		loading: false,
		error: '',
	},
	reducers: {},
	extraReducers: {
		[getNotificatons.pending]: (state) => {
			state.loading = true;
		},
		[getNotificatons.rejected]: (state, action) => {
			state.error = action.error;
		},
		[getNotificatons.fulfilled]: (state, action) => {
			state.loading = false;
			state.notificationList = action.payload;
		},
		[updateNotiSeen.fulfilled]: (state, action) => {
			state.loading = false;
			state.notificationList = action.payload;
		},
	},
});

const { reducer: notiReducer } = notificationSlice;
export default notiReducer;
