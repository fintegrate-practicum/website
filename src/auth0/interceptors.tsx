import axios from 'axios';
import qs from 'qs';
import { useJwtFromCookie } from '../Redux/hooks';

 

const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
  paramsSerializer: params => qs.stringify(params, { indices: false }),
});

instance.interceptors.request.use(
  config => {
    let token=useJwtFromCookie("accessToken")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }

);


export default instance;
