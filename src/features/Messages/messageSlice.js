import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
	name: 'messages',
	initialState: {
		messageList: {},
		loading: false,
		error: '',
	},
	reducers: {
		addNewBoxChat: (state, action) => {
			if (!state.messageList.hasOwnProperty(action.payload)) {
				state.messageList[action.payload] = [];
			}
		},

		getMessageByFriend: (state, action) => {
			const messages = action.payload.msg.concat(
				state.messageList[action.payload.friend]
			);
			state.messageList[action.payload.friend] = messages;
		},

		addNewMessage: (state, action) => {
			state.messageList[action.payload.friend].push(action.payload.msg);
		},
	},
});

const { reducer: messageReducer, actions } = messageSlice;
export const { addNewMessage, getMessageByFriend, addNewBoxChat } = actions;
export default messageReducer;
