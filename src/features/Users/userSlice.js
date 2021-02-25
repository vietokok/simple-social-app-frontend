import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';

export const getAllUser = createAsyncThunk('/user/getAllUser', async () => {
	const response = await userApi.getAllUser();
	return response.users;
});

export const getUserById = createAsyncThunk('/user/getUserById', async () => {
	const response = await userApi.getByUserId();
	return response.user;
});

const userSlice = createSlice({
	name: 'users',
	initialState: {
		friendList: [],
		me: {},
		loading: false,
		error: '',
	},
	reducers: {},
	extraReducers: {
		[getAllUser.pending]: (state) => {
			state.loading = true;
		},
		[getAllUser.rejected]: (state, action) => {
			state.error = action.error;
		},
		[getAllUser.fulfilled]: (state, action) => {
			state.loading = false;
			state.friendList = action.payload;
		},
		[getUserById.fulfilled]: (state, action) => {
			state.me = action.payload;
		},
	},
});

const { reducer: userReducer } = userSlice;
export default userReducer;
