import axiosClient from './axiosClient';

const notificationApi = {
	getNotifications: () => {
		const url = `/notification`;
		return axiosClient.get(url);
	},

	updateNotiSeen: () => {
		const url = `/notification`;
		return axiosClient.post(url);
	},
};

export default notificationApi;
