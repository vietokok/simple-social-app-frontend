import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postApi from 'api/postApi';

export const getAllPost = createAsyncThunk('/post/getAllPost', async () => {
	try {
		const response = await postApi.getPosts();
		return response.posts;
	} catch (error) {
		console.log(error);
	}
});

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

export const likePost = createAsyncThunk('/post/likePost', async (params) => {
	const response = await postApi.likePost(params);
	return response.info;
});

export const commentPost = createAsyncThunk(
	'/post/commentPost',
	async (params) => {
		const response = await postApi.commentPost(params.id, params.data);
		return response.post;
	}
);

const postSlice = createSlice({
	name: 'posts',
	initialState: {
		postList: [],
		postDetail: {},
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

		[createPost.fulfilled]: (state, action) => {
			state.postList.unshift(action.payload);
		},

		[updatePost.fulfilled]: (state, action) => {
			const index = state.postList.findIndex(
				(post) => post._id === action.payload._id
			);

			state.postList.splice(index, 1, action.payload);
		},

		[deletePost.fulfilled]: (state, action) => {
			const index = state.postList.findIndex(
				(post) => post._id === action.payload.id
			);

			state.postList.splice(index, 1);
		},

		[likePost.fulfilled]: (state, action) => {
			const index = state.postList.findIndex(
				(post) => post._id === action.payload.postId
			);

			if (action.payload.action === 'like') {
				state.postList[index].like.push(action.payload.userId);
			} else {
				const indexItem = state.postList[index].like.findIndex(
					(item) => item === action.payload.userId
				);
				state.postList[index].like.splice(indexItem, 1);
			}
		},
		[commentPost.fulfilled]: (state, action) => {
			const index = state.postList.findIndex(
				(post) => post._id === action.payload._id
			);

			state.postList.splice(index, 1, action.payload);
		},
	},
});

const { reducer: postReducer } = postSlice;
export default postReducer;
