import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}

		return response;
	},
	(error) => {
		if (
			error.response.data.message === 'Authentication failed!' &&
			error.response.status === 403
		) {
			location.reload();
		}
	}
);

export default axiosClient;
