import axiosClient from './axiosClient';

const userApi = {
	getByUserId: () => {
		const url = '/user';
		return axiosClient.get(url);
	},
	getAllUser: () => {
		const url = '/user/all';
		return axiosClient.get(url);
	},
};

export default userApi;
