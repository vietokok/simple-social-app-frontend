import axios from 'axios';
import queryString from 'query-string';
import { getLocalStorage } from 'utils';

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
	const local = getLocalStorage();
	if (local) {
		config.headers.Authorization = `Bearer ${local.token}`;
	}

	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}

		return response;
	},
	(error) => {
		throw error;
	}
);

export default axiosClient;
