import axiosClient from './axiosClient';

const messageApi = {
	getMessageByRoom: (friendId) => {
		const url = `/message/${friendId}`;
		return axiosClient.get(url);
	},
};

export default messageApi;
