import axios from 'axios';
import qs from 'qs';
import { getTokenSilently } from './authUtils';

const workerInstance = axios.create({
  baseURL: import.meta.env.VITE_WORKERS_SERVICE_URL,
  paramsSerializer: (params) => qs.stringify(params, { indices: false }),
});

workerInstance.interceptors.request.use(
  async (config) => {
    const token = await getTokenSilently();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default workerInstance;
