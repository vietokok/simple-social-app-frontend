import axiosClient from './axiosClient';

const postApi = {
	getPosts: () => {
		const url = `/post/all`;
		return axiosClient.get(url);
	},

	createPost: (data) => {
		const url = '/post/create';
		return axiosClient.post(url, data);
	},

	updatePost: (postId, data) => {
		const url = `/post/${postId}`;
		return axiosClient.patch(url, data);
	},

	deletePost: (postId) => {
		const url = `/post/${postId}`;
		return axiosClient.delete(url);
	},

	likePost: (postId) => {
		const url = `/post/${postId}/like`;
		return axiosClient.post(url);
	},
	commentPost: (postId, data) => {
		const url = `/post/${postId}/comment`;
		return axiosClient.post(url, data);
	},
};

export default postApi;
