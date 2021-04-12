import { configureStore } from '@reduxjs/toolkit';
import messageReducer from 'features/Messages/messageSlice';
import notiReducer from 'features/Notifications/notificationSlice';
import postReducer from 'features/Posts/postSlice';
import userReducer from 'features/Users/userSlice';

const rootReducer = {
	posts: postReducer,
	users: userReducer,
	messages: messageReducer,
	notifications: notiReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
