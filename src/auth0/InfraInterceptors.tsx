import axios from 'axios';
import qs from 'qs';
import { useJwtFromCookie } from '../Redux/hooks';

const InfraInstance = axios.create({
	baseURL: import.meta.env.VITE_INFRA_SERVICE_URL,
	paramsSerializer: (params) => qs.stringify(params, { indices: false }),
});
InfraInstance.interceptors.request.use(
	(config) => {
		const token = useJwtFromCookie('accessToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default InfraInstance;
