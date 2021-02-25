import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import messageApi from 'api/messageApi';

export const getMessageByRoom = createAsyncThunk(
	'/message/getMessageByRoom',
	async (params) => {
		const response = await messageApi.getMessageByRoom(params);
		return response.messages;
	}
);

const messageSlice = createSlice({
	name: 'posts',
	initialState: {
		messageList: [],
		loading: false,
		error: '',
	},
	reducers: {
		addNewMessage: (state, action) => {
			state.messageList.push(action.payload);
		},
	},
	extraReducers: {
		[getMessageByRoom.pending]: (state) => {
			state.loading = true;
		},
		[getMessageByRoom.rejected]: (state, action) => {
			state.error = action.error;
		},
		[getMessageByRoom.fulfilled]: (state, action) => {
			state.loading = false;
			state.messageList = action.payload;
		},
	},
});

const { reducer: messageReducer, actions } = messageSlice;
export const { addNewMessage } = actions;
export default messageReducer;
