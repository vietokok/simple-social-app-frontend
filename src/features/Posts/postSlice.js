import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postApi from 'api/postApi';

export const getAllPost = createAsyncThunk('/post/getAllPost', async () => {
	const response = await postApi.getAllPost();
	return response.posts;
});

export const getPostByMe = createAsyncThunk('/post/getPostByMe', async () => {
	const response = await postApi.getPostByMe();
	return response.posts;
});

export const getPostByFriendId = createAsyncThunk(
	'/post/getPostByFriendId',
	async (params) => {
		const response = await postApi.getPostByFriendId(params);
		return response.posts;
	}
);

export const createPost = createAsyncThunk(
	'/post/createPost',
	async (params) => {
		const response = await postApi.createPost(params);
		return response.post;
	}
);

export const updatePost = createAsyncThunk(
	'/post/updatePost',
	async (params) => {
		const response = await postApi.updatePost(params.id, params.data);
		return response.post;
	}
);

export const deletePost = createAsyncThunk(
	'/post/deletePost',
	async (params) => {
		const response = await postApi.deletePost(params);
		return response.message;
	}
);

const postSlice = createSlice({
	name: 'posts',
	initialState: {
		postList: [],
		me: [],
		friend: [],
		loading: false,
		error: '',
	},
	reducers: {},
	extraReducers: {
		[getAllPost.pending]: (state) => {
			state.loading = true;
		},
		[getAllPost.rejected]: (state, action) => {
			state.error = action.error;
		},
		[getAllPost.fulfilled]: (state, action) => {
			state.loading = false;
			state.postList = action.payload;
		},
		[getPostByMe.pending]: (state) => {
			state.loading = true;
		},
		[getPostByMe.rejected]: (state, action) => {
			state.error = action.error;
		},
		[getPostByMe.fulfilled]: (state, action) => {
			state.loading = false;
			state.me = action.payload;
		},
		[getPostByFriendId.pending]: (state) => {
			state.loading = true;
		},
		[getPostByFriendId.rejected]: (state, action) => {
			state.error = action.error;
		},
		[getPostByFriendId.fulfilled]: (state, action) => {
			state.loading = false;
			state.friend = action.payload;
		},
		[createPost.fulfilled]: (state, action) => {
			state.postList.unshift(action.payload);
			state.me.unshift(action.payload);
		},
		[updatePost.fulfilled]: (state, action) => {
			const indexMe = state.me.findIndex(
				(post) => post._id === action.payload._id
			);
			const indexPostList = state.postList.findIndex(
				(post) => post._id === action.payload._id
			);
			state.me.splice(indexMe, 1, action.payload);
			state.postList.splice(indexPostList, 1, action.payload);
		},
		[deletePost.fulfilled]: (state, action) => {
			const indexMe = state.me.findIndex(
				(post) => post._id === action.payload.id
			);
			const indexPostList = state.postList.findIndex(
				(post) => post._id === action.payload.id
			);
			state.me.splice(indexMe, 1);
			state.postList.splice(indexPostList, 1);
		},
	},
});

const { reducer: postReducer } = postSlice;
export default postReducer;
