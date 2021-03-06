import axiosClient from './axiosClient';

const postApi = {
	getAllPost: () => {
		const url = '/post/all';
		return axiosClient.get(url);
	},
	getPostByMe: () => {
		const url = '/post/user';
		return axiosClient.get(url);
	},

	getPostByFriendId: (friendId) => {
		const url = `/post/${friendId}`;
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
};

export default postApi;
