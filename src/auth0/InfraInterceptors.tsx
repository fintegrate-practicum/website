import axios from 'axios';
import qs from 'qs';
import { getTokenSilently } from './authUtils';

const InfraInstance = axios.create({
  baseURL: import.meta.env.VITE_INFRA_SERVICE_URL,
  paramsSerializer: (params) => qs.stringify(params, { indices: false }),
});

InfraInstance.interceptors.request.use(
  async (config) => {
    console.log("i get InfraInstance")
    const token = await getTokenSilently();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("i get InfraInstance with config",config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default InfraInstance;
